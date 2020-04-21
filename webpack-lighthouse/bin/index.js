#!/usr/bin/env node
const path = require('path');
const argv = require('yargs')
  .default({ 
    port: 3000, 
    config: 'webpack.config.js',
    output: 'report'
  })
  .argv;

const webpackConfigPath = path.resolve(process.cwd(), argv.config);

require("../")(argv.port, webpackConfigPath, argv.output, argv._)
  .then(() => {
    process.exit(0);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  });