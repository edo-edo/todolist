const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv-webpack');

const BUILD_DIR = path.resolve(__dirname, './dist/');
const APP_DIR = path.resolve(__dirname, './client/index.js');


const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    main: APP_DIR
  },
  output: {
    filename: 'main.bundle.js',
    path: BUILD_DIR
  },
    mode: 'development',
    devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    historyApiFallback: true
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
