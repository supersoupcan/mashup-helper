const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry : ['babel-polyfill', path.resolve(__dirname, 'client_src', 'index.js')],
  output : {
    path : path.resolve(__dirname, 'client_dist'),
    filename : 'bundle.js'
  },
  module : {
    rules : [{
      test : /.jsx?/,
      exclude : /node_modules/,
      use : {
        loader : 'babel-loader',
        options : {
          presets : ['env', 'react']
        }
      },
    },{
      test : /\.css/,
      loader : ExtractTextPlugin.extract({
        fallback : 'style-loader',
        use : [
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      })
    }]
  },
  plugins : [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      inject : true,
      template : path.resolve(__dirname, 'client_src', 'index.html')
    })
  ]
}