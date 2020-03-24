const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  plugins: [
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin({
      scriptLoading: 'defer'
    }),
    // SCSS Configuration for .css .module.css and .scss .module.scss files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
    new ScssConfigWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  }
};
