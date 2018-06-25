/* global __dirname, require, module*/
require('babel-core/register')
require('babel-polyfill')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const WebpackShellPlugin = require('webpack-shell-plugin')
const path = require('path')
const env = require('yargs').argv.env // use --env with webpack 2
const pkg = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

let libraryName = pkg.name

let plugins = [], outputFile, outputFileCSS

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = libraryName + '.min.js'
  outputFileCSS = libraryName + '.min.css'
} else {
  outputFile = libraryName + '.js'
  outputFileCSS = libraryName + '.css'
}

//Launch a dev server once webpack is finished
if (env === 'dev') {
  plugins.push(new WebpackShellPlugin({ onBuildEnd: ['nodemon ./server.js'] }))
}

const configJS = {
  entry: ['babel-polyfill', __dirname + '/src/index.js'],
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
}

const configCSS = {
  entry: __dirname + '/styles/style.scss',
  output: {
    path: __dirname + '/dist',
    filename: outputFileCSS
  },
  module: {
    rules: [{
      test: /\.(s*)css$/, 
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      }),
      exclude: /node_modules/
    }]
  },
  plugins: [
    new ExtractTextPlugin(outputFileCSS)
  ]
}

module.exports = [configJS, configCSS]
