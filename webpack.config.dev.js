'use strict';

var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    './public/css/app.css',
    './src/client',
  ],
  output: {
    path: __dirname + '/public/js/index',
    filename: 'app.js',
    publicPath: 'http://localhost:8081/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?stage=0&externalHelpers'], exclude: /node_modules/ },
      { test: /\.css/, loader: "style-loader!css-loader" },
    ]
  }
};
