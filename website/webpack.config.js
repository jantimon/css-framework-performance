const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  plugins: [
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin({
      templateParameters: {
        __dirname: __dirname + '/src'
      },
      template: './src/ssr.tsx',
      scriptLoading: 'defer'
    }),
    // SCSS Configuration for .css .module.css and .scss .module.scss files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
    new ScssConfigWebpackPlugin(),
    // Multi threading typescript loader configuration with caching for .ts and .tsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
    new TsConfigWebpackPlugin(),
  ],
};
