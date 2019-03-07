// imports
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const program = require('commander');


// constants
const DEV_BUCKET = process.env.npm_package_config_gcsDevBucket;
const MANIFEST_FILE = process.env.npm_package_config_manifestFile;
const CSS_FILE = process.env.npm_package_config_cssFile;
const JSON_FILE = process.env.npm_package_config_jsonFile;


program
  .option('-f, --format', '?', /^(object|row)$/i, 'object')
  .parse(process.argv);



console.log(program);

// default to dev if it's not prod
const DEVMODE = true;
const GCS_BUCKET = DEV_BUCKET;

const encoding = 'utf-8';

// common options
let webpackOptions = {
  entry: {
    // this is the viz source code
    main: path.resolve(__dirname, '..', 'scripts', 'printMessage.js'),
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '..', 'datastudio'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join('src', JSON_FILE), to: '.'},
      {from: path.join('src', CSS_FILE), to: '.'},
    ]),
  ],
};

if (DEVMODE === true) {
  const devOptions = {
    mode: 'development',
    devtool: 'inline-source-map',
  };
  webpackOptions = Object.assign(webpackOptions, devOptions);
} else {
  const prodOptions = {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: false,
          uglifyOptions: {
            comments: false,
          },
        }),
      ],
    },
  };
  webpackOptions = Object.assign(webpackOptions, prodOptions);
}

const compiler = webpack(webpackOptions);

// put everything together except the manifest
compiler.run((err, stats) => {
  // once datastudio is created...
  fs.readFileAsync(path.join('src', MANIFEST_FILE), encoding).then((value) => {
    const newManifest = value
      .replace(/YOUR_GCS_BUCKET/g, GCS_BUCKET)
      .replace(/"DEVMODE_BOOL"/, DEVMODE);
    fs.writeFileAsync(
      path.join('./datastudio', MANIFEST_FILE),
      newManifest
    ).catch((err) => {
      console.log('Unable to write manifest: ', err);
    });
  });
});
