"use strict";

var path = require("path");
// const webpack = require("webpack");
// const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  // externals: [nodeExternals()],
  entry: "./src/js/app",
  output: {
    path: path.join(__dirname, "build"),
    // path: "./build/build.js",
    filename: "build.js",
    publicPath: "/build/"
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 100
  // },
  devtool: "source-map",
  // resolve: {
  //   modulesDirectories: ['node_modules'],
  //   extensions: ['','.js']
  // },
  module: {
    rules: [
      {
        test: "/.js$/",
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["env"] }
          }
        ]
      }
    ]
  }
};
