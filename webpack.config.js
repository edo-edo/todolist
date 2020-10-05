const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", "./client/index.js"],
  node: {
    fs: "empty"
},
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin(),
    new dotenv()
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }

        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
};
