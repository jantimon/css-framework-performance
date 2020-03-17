const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  plugins: [
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin({ 
      scriptLoading: 'defer'
    }),
    // Multi threading typescript loader configuration with caching for .ts and .tsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
    new TsConfigWebpackPlugin(),
  ],
};
