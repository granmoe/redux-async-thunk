const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}

// devtool: 'eval-source-map',
