const path = require("path");
const launchWebpackServer = require("./server");
const mkdirp = require("mkdirp");
const execa = require("execa");

module.exports = async function generateReport(
  port,
  webpackConfigPath,
  outputPath
) {
  // Compile with webpack
  const webpackConfig = require(webpackConfigPath);
  await launchWebpackServer(port, webpackConfig, {
    hot: false
  });
  const reportHTMLFile = /[^\.]+\./.test(path.basename(outputPath))
    ? outputPath
    : path.join(outputPath, "index");
  // Generate report  
  mkdirp(path.dirname(reportHTMLFile));
  await startLighthouse([
    `http://127.0.0.1:${port}/index.html`,
    "--output",
    "html",
    "--output",
    "json",
    "--output-path",
    reportHTMLFile,
    "--throttling.cpuSlowdownMultiplier=4",
    '--chrome-flags="--headless"',
  ]);
  await startLighthouse([
    `http://127.0.0.1:${port}/index.html`,
    "--output",
    "html",
    "--output",
    "json",
    "--output-path",
    reportHTMLFile + '-01',
    "--throttling.cpuSlowdownMultiplier=4",
    '--chrome-flags="--headless"',
  ]);
  await startLighthouse([
    `http://127.0.0.1:${port}/index.html`,
    "--output",
    "html",
    "--output",
    "json",
    "--output-path",
    reportHTMLFile + '-02',
    "--throttling.cpuSlowdownMultiplier=4",
    '--chrome-flags="--headless"',
  ]);
  // Compile static with webpack
  await staticCompile(webpackConfigPath, path.join(outputPath, 'page'));
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

async function staticCompile(webpackConfigPath, outputPath) {
  console.log("🚩", "static webpack");
  const childProcess = execa(require.resolve("webpack-cli"), ['--config', webpackConfigPath, '--output-path', outputPath]);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  return await childProcess.then(
    () => {},
    err => {
      console.error(err);
    }
  );
}