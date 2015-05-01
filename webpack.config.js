'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/client',
  output: {
    path: __dirname + '/public/js/',
    filename: 'app.min.js',
    publicPath: '/js/'
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  // ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader?stage=0&externalHelpers'], exclude: /node_modules/ }
    ]
  }
};
