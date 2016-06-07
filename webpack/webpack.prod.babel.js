// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const assetsPath = path.resolve(__dirname, '../dist') + '/'
const projectRootPath = path.resolve(__dirname, '..')

module.exports = require('./webpack.base.babel')({
  entry: [
    path.join(process.cwd(), 'src/app.js')
  ],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  cssLoaders: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?importLoaders=1!postcss-loader'
  ),
  postcssPlugins: [
    postcssImport(),
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10']
    }),
    postcssReporter({
      clearMessages: true
    })
  ],
  plugins: [

    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // Extract CSS
    new ExtractTextPlugin('[name].[chunkhash].css', { allChunks: true }),

    // optimise
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),

    webpackIsomorphicToolsPlugin
  ]
});
