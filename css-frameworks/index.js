const path = require('path');
const glob = require('fast-glob');
const execa = require('execa');

(async () => {
  const dirs = await getDirectoriesWithWebpackConfig(__dirname);
  for (let i = 0; i < dirs.length; i++) {
    console.log("📝 generate ", dirs[i]);
    await executeTest(dirs[i], '3g', [
      "--throttling-method=devtools",
      "--throttling.cpuSlowdownMultiplier=4",
      '--chrome-flags="--headless"'
    ]);
    await executeTest(dirs[i], '4g', [
      "--throttling.cpuSlowdownMultiplier=4",
      '--chrome-flags="--headless"'
    ]);
  }
  console.log("done.");
})();

async function getDirectoriesWithWebpackConfig(cwd) {
  const webpackConfigs = await glob("*/webpack.config.js", {
    cwd
  });
  return webpackConfigs.map(file =>
    path.resolve(__dirname, path.dirname(file))
  );
}

async function executeTest(dir, mode, lighthouseArgs) {
  const outputDir = path.resolve(
    __dirname,
    "../public/reports/" + mode,
    path.basename(dir)
  );
  const bin = require.resolve('webpack-lighthouse/bin');
  const childProcess = execa(bin, [
    "--config",
    `${dir}/webpack.config.js`,
    "--output",
    outputDir,
    '--',
    ...lighthouseArgs
  ]);
  childProcess.stdout.pipe(process.stdout);
  childProcess.stderr.pipe(process.stderr);
  return childProcess;
}
