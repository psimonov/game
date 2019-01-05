const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  context: `${__dirname}/src`,
  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 15000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }

        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin([{
      from: './assets',
    }]),
    new CleanWebpackPlugin(['build']),
  ],
};
