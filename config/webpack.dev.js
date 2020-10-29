// const path = require('path');
// const webpack = require("webpack")
// const htmlWebpackPlugin = require('html-webpack-plugin');
// const miniCssExtractPlugin = require('mini-css-extract-plugin');
// const dotenv = require('dotenv-webpack');

// module.exports = {
//   entry: {
//     app : [
//       './client/index.js',
//       'webpack-hot-middleware/client?reload=true',
//     ]
//   },
//   resolve: { extensions: ["*", ".js", ".jsx"] },
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/'
//   },
//   mode: 'development',
//   devServer: {
//     contentBase: path.resolve(__dirname, 'client'),
//     hot:true,
//     quiet: false,
//     noInfo: false,
//     lazy: false,
//     stats: {
//       colors: true
//     },
//     historyApiFallback: true,
//   },


//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new htmlWebpackPlugin({
//       template: './client/index.html',
//       filename: 'index.html',
//     }),
//     new miniCssExtractPlugin(),
//     new dotenv(),
    
//   ],

//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//           miniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader',
//             options: {
//               importLoaders: 1,
//               modules: true
//             }
//           }

//         ],
//       },
//       {
//         test: /\.(png|svg|jpg|gif)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//                 name: "images/[name]-[hash:8].[ext]"
//               }
//           }
//         ],
//       },

//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: "babel-loader",
//         }
//       },

//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader"
//           }
//         ]
//       }
//     ],
//   },
// };
const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './client/index.js',
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'

  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },


  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      template: "./client/index.html"
    })
  ],

  module:{
    rules:[
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            query: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
                name: "images/[name]-[hash:8].[ext]"
              }
          }
        ]
      }
    ]
  }
}
