"use strict";

var path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: ["webpack-dev-server/client", "./js/app"]
  },
  output: {
    filename: "build.js",
    library: "app"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    host: "localhost",
    compress: true,
    port: 9000,
    hot: true
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: "source-map",
  // resolve: {
  //   modulesDirectories: ['node_modules'],
  //   extensions: ['','.js']
  // },
  module: {
    rules: [
      {
        test: "/.js$/",
        loader: "babel?optional[]=runtime"
      }
    ]
  }
};
