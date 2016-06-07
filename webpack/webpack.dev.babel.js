/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const config = require('./../src/env.js');
const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = require('./webpack.base.babel')({
  // Add hot reloading in development
  entry: [
    'webpack-hot-middleware/client?path=' + 'http://' + config.host + ':' + (config.port + 1) + '/__webpack_hmr',
    path.join(process.cwd(), 'src/app.js') // Start with js/app.js
  ],

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://' + config.host + ':' + (config.port + 1) + '/dist/'
  },

  // Load the CSS in a style tag in development
  // cssLoaders: 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
  cssLoaders: 'style-loader!css-loader?importLoaders=1&sourceMap!postcss-loader',

  // Process the CSS with PostCSS
  postcssPlugins: [
    postcssImport(),
    postcssFocus(), // Add a :focus to every :hover
    cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
      browsers: ['last 2 versions', 'IE > 10'] // ...based on this browser list
    }),
    postcssReporter({ // Posts messages from plugins to the terminal
      clearMessages: true
    })
  ],

  // Add hot reloading
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new webpack.NoErrorsPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ],

  // Tell babel that we want to hot-reload
  babelQuery: {
    presets: ['react-hmre']
  },

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map'
});
