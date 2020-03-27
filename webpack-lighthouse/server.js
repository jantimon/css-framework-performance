const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const compression = require('compression');

module.exports = async function launchWebpackServer(port = 3000, webpackConfig = {}, webpackDevMiddleWareOptions = {}) {
	console.log(port);
  const app = express();
  const compiler = webpack(webpackConfig);
  const webpackDevMiddleWare = middleware(compiler, webpackDevMiddleWareOptions);
  app.use(compression());
  app.use(webpackDevMiddleWare);
  // Wait until server is up
  const firstWebpackBuild = new Promise((resolve) => webpackDevMiddleWare.waitUntilValid(resolve));
  const expressServerInstance = new Promise((resolve) => {
    const server = app.listen(port, () => resolve(server));
  });
  return Promise.all([firstWebpackBuild, expressServerInstance]);
}
