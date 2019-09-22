'use strict'

module.exports = {
  entry: './js/app',
  output: {
    filename: 'build.js',
    library: 'app'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: 'source-map',
  // resolve: {
  //   modulesDirectories: ['node_modules'],
  //   extensions: ['','.js']
  // },
  module: {
    rules: [
      {
        test: '/\.js$/',
        loader: 'babel?optional[]=runtime'
      }
    ]
  }
}