import * as fs from 'mz/fs';
import * as path from 'path';
import * as constants from '../../src/constants';
import * as files from '../../src/files';
import {ProjectChoice, VizConfig} from '../../src/types';
import * as sut from '../../src/viz';

console.log = jest.fn();

const fiveMinutes = 5 * 60 * 1000;
jest.setTimeout(fiveMinutes);

const hasFile = async (...paths: string[]): Promise<boolean> => {
  return fs.exists(path.resolve(constants.PWD, ...paths));
};

describe('End-to-end-tests for viz', () => {
  const vizNames = {
    happyPath: 'happy_path_viz',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('happy path', async () => {
    const vizName = vizNames.happyPath;
    const config: VizConfig = {
      devBucket: 'test/dscc-gen-test-dev',
      prodBucket: 'test/dscc-gen-test-prod',
      yarn: false,
      ts: false,
      projectName: vizName,
      projectChoice: ProjectChoice.VIZ,
      basePath: '.',
    };

    await sut.createFromTemplate(config);
    expect(await hasFile(vizName)).toBeTruthy();
    expect(await hasFile(vizName, 'src', 'index.js')).toBeTruthy();

    files.remove(vizName);
  });
});
