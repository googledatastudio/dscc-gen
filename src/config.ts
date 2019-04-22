import * as argparse from 'argparse';
import {Question} from 'inquirer';
import inquirer = require('inquirer');
import * as path from 'path';
import {PWD} from './index';
import {assertNever} from './util';
import * as util from './util';
import {
  addBucketPrefix,
  checkGsutilInstalled,
  hasBucketPermissions,
} from './viz/validation';

export enum ProjectChoice {
  VIZ = 'viz',
  CONNECTOR = 'connector',
}

interface CommonConfig {
  yarn: boolean;
  projectName: string;
  projectChoice: ProjectChoice;
  basePath: string;
}

export enum AuthType {
  NONE = 'NONE',
  OAUTH2 = 'OAUTH2',
  KEY = 'KEY',
  USER_PASS = 'USER_PASS',
  USER_TOKEN = 'USER_TOKEN',
}

interface VizConfigHasDefaults {}

interface ConnectorConfigHasDefaults {
  manifestLogoUrl: string;
  manifestCompany: string;
  manifestCompanyUrl: string;
  manifestAddonUrl: string;
  manifestSupportUrl: string;
  manifestDescription: string;
  manifestSources: string;
  authType: AuthType;
}

export interface ConnectorConfig
  extends CommonConfig,
    ConnectorConfigHasDefaults {
  scriptId?: string;
}
export interface VizConfig extends CommonConfig, VizConfigHasDefaults {
  devBucket: string;
  prodBucket: string;
}

const addVizParser = (
  subparser: argparse.SubParser
): argparse.ArgumentParser => {
  const vizParser = subparser.addParser(ProjectChoice.VIZ, {
    addHelp: true,
    description: 'Creates a project using a Community Viz template.',
  });

  vizParser.addArgument(['--devBucket', '-d'], {
    dest: 'devBucket',
    help: 'The dev bucket',
  });

  vizParser.addArgument(['--prodBucket', '-p'], {
    dest: 'prodBucket',
    help: 'The dev bucket',
  });

  return vizParser;
};

const addConnectorParser = (
  subparser: argparse.SubParser
): argparse.ArgumentParser => {
  const connectorParser = subparser.addParser(ProjectChoice.CONNECTOR, {
    addHelp: true,
    description: 'Creates a project using a Community Connector template.',
  });

  connectorParser.addArgument(['--script_id', '-s'], {
    dest: 'scriptId',
    help: 'The id of the script to clone.',
  });

  connectorParser.addArgument(['--auth_type'], {
    dest: 'authType',
    help: 'The authorization type for the connector.',
    choices: Object.values(AuthType),
  });

  return connectorParser;
};

const projectNameRegEx = /^([-_A-Za-z\d])+$/;

const projectNameValidator = async (input: string) => {
  if (!projectNameRegEx.test(input)) {
    return 'Name may only include letters, numbers, dashes, and underscores.';
  }
  const projectPath = path.join(PWD, input);
  if (await util.fileExists(projectPath)) {
    return `The directory ${input} already exists.`;
  }
  return true;
};

const commonQuestions: Array<Question<CommonConfig>> = [
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name',
    validate: projectNameValidator,
  },
];

const vizQuestions: Array<Question<VizConfig>> = commonQuestions.concat([
  {
    name: 'devBucket',
    type: 'input',
    message: 'What is your dev bucket?',
    transformer: addBucketPrefix,
    validate: async (a) => hasBucketPermissions(addBucketPrefix(a)),
  },
  {
    name: 'prodBucket',
    type: 'input',
    message: 'What is your prod bucket?',
    transformer: addBucketPrefix,
    validate: async (a) => hasBucketPermissions(addBucketPrefix(a)),
  },
]);

const getAuthHelpText = (authType: AuthType): string => {
  switch (authType) {
    case AuthType.NONE:
      return 'No authentication required.';
    case AuthType.KEY:
      return 'Key or Token';
    case AuthType.OAUTH2:
      return 'Standard OAUTH2';
    case AuthType.USER_PASS:
      return 'Username & Password';
    case AuthType.USER_TOKEN:
      return 'Username & Token';
    default:
      return assertNever(authType);
  }
};

const longestAuthType = Object.values(AuthType)
  .map((a: AuthType): number => a.length)
  .reduce((a, b) => Math.max(a, b), 0);

const connectorQuestions: Array<
  Question<ConnectorConfig>
> = commonQuestions.concat([
  {
    name: 'authType',
    type: 'list',
    message: 'How will users authenticate to your service?',
    choices: Object.values(AuthType).map((auth: AuthType) => ({
      name: `${auth.padEnd(longestAuthType)} - ${getAuthHelpText(auth)}`,
      value: auth,
    })),
  },
]);

const getParser = (): argparse.ArgumentParser => {
  const parser = new argparse.ArgumentParser({
    version: process.env.npm_package_version,
    addHelp: true,
    description: 'Tool for generating Data Studio Developer feature projects.',
  });

  const subParser = parser.addSubparsers({
    title: 'Project Type',
    dest: 'projectChoice',
  });

  const vizParser = addVizParser(subParser);
  const connectorParser = addConnectorParser(subParser);
  [vizParser, connectorParser].forEach((p: argparse.ArgumentParser) => {
    p.addArgument(['--name', '-n'], {
      help: 'The name of the project you want to create.',
      dest: 'projectName',
    });
    p.addArgument(['--yarn'], {
      dest: 'yarn',
      action: 'storeTrue',
      help: 'Use yarn as the build tool.',
    });
  });

  return parser;
};

const getMissing = async <T extends U, U>(
  args: T,
  questions: Array<Question<T>>,
  defaults: U
): Promise<T> => {
  const providedKeys = Object.keys(args).filter(
    (a) => (args as any)[a] !== null
  );
  const validations = providedKeys.map(async (a) => {
    const value = (args as any)[a];
    if (value !== undefined) {
      const question = questions.find((q) => q.name === a);
      if (question !== undefined) {
        const {validate} = question;
        if (validate !== undefined) {
          return validate(value);
        }
      }
    }
  });
  await Promise.all(validations);

  const remainingQuestions = questions.filter((q) => {
    return providedKeys.find((key) => q.name === key) === undefined;
  });

  const answers = await inquirer.prompt(remainingQuestions);
  return Object.assign(defaults, args, answers);
};

const withMissing = async (
  args: VizConfig | ConnectorConfig
): Promise<VizConfig | ConnectorConfig> => {
  const projectChoice = args.projectChoice;
  switch (projectChoice) {
    case ProjectChoice.CONNECTOR:
      const connectorDefaults: ConnectorConfigHasDefaults = {
        manifestLogoUrl: 'logoUrl',
        manifestCompany: 'manifestCompany',
        manifestCompanyUrl: 'companyUrl',
        manifestAddonUrl: 'addonUrl',
        manifestSupportUrl: 'supportUrl',
        manifestDescription: 'description',
        manifestSources: '',
        authType: AuthType.NONE,
      };
      return getMissing(
        args as ConnectorConfig,
        connectorQuestions,
        connectorDefaults
      );
    case ProjectChoice.VIZ:
      await checkGsutilInstalled();
      const vizDefaults: VizConfigHasDefaults = {};
      return getMissing(args as VizConfig, vizQuestions, vizDefaults);
    default:
      return assertNever(projectChoice);
  }
};

export const getConfig = async (): Promise<VizConfig | ConnectorConfig> => {
  const parser = getParser();
  const args = parser.parseArgs();
  const config = await withMissing(args);
  Object.keys(config).forEach((key) => {
    const val = (config as any)[key];
    if (val === null) {
      delete (config as any)[key];
    }
  });
  return config;
};
