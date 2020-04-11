const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  context: __dirname,
  mode: 'production',

  output: {
    publicPath: '/css-framework-performance/'
  },

  module: {
    rules : [
      {
        test: /\.json$/,
        type: 'javascript/auto',
        resourceQuery: /javascript/
      }
    ],
  },

  plugins: [
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin({
      templateParameters: {
        __dirname: __dirname + '/src'
      },
      template: './src/ssr.tsx',
      scriptLoading: 'defer'
    }),
    // Copyright https://commons.wikimedia.org/wiki/File:Speed_ballonicon2.svg?uselang=fr
    new FaviconsWebpackPlugin({logo: './logo.png', favicons: {
      appName: 'CSS-Framework Lighthouse Scores',
    }}),
    // SCSS Configuration for .css .module.css and .scss .module.scss files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
    new ScssConfigWebpackPlugin(),
    // Multi threading typescript loader configuration with caching for .ts and .tsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
    new TsConfigWebpackPlugin(),
  ],
};
