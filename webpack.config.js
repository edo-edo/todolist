const path = require('path');
const webpack = require("webpack")
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: ["@babel/polyfill", "./client/index.js"]
  },
  node: {
    fs: "empty"
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 8080,
    host: "localhost",
    inline: true,
    historyApiFallback: true
  },


  plugins: [
    new htmlWebpackPlugin({
      template: "./client/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin(),
    new dotenv(),
    
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
        include: path.resolve(__dirname, 'client'),
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
