const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin(),
    new ScssConfigWebpackPlugin(),
  ]
}