const path = require("path");
const launchWebpackServer = require("./server");
const mkdirp = require("mkdirp");
const execa = require("execa");
const webpack = require('webpack');


module.exports = async function generateReport(
  port,
  webpackConfigPath,
  outputPath
) {
  // Compile with webpack
  const webpackConfig = require(webpackConfigPath);
  // Compile static with webpack
  await compile({...webpackConfig, output: { ...(webpackConfig.output || {}), path: path.join(outputPath, 'page') }})
  await launchWebpackServer(port, webpackConfig, {
    hot: false
  });
  const reportHTMLFile = /[^\.]+\./.test(path.basename(outputPath))
    ? outputPath
    : path.join(outputPath, "index.html");
  // Generate report  
  mkdirp(path.dirname(reportHTMLFile));
  await startLighthouse([
    `http://127.0.0.1:${port}/index.html`,
    //"--verbose",
    "--output-path",
    reportHTMLFile,
    '--chrome-flags="--headless"',
  ]);
};

async function startLighthouse(args) {
  console.log("🚩", "lighthouse", args.join(" "));
  const lighthouseCli = require.resolve('lighthouse/lighthouse-cli/index.js')
  const childProcess = execa(lighthouseCli, args);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  return await childProcess.then(
    () => {},
    err => {
      console.error(err);
    }
  );
}

function compile(webpackConfig) {
  return new Promise((resolve, reject) => webpack(webpackConfig, (err, stats) => {
    const error = err || (stats.compilation.errors.length && stats.compilation.errors) || (stats.compilation.warnings.length && stats.compilation.warnings);
    console.log(error);
    if (error) {
      reject(error);
    } else {
      resolve(stats);
    }
  }));
}