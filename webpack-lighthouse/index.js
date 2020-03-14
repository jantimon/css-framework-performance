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
