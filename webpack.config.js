var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var webpackConfig = {
  entry: {  // 入口文件（css文件也在js中引入）
    index: ['./src/js/index.js'],
    list: ['./src/js/list.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出根目录
    filename: 'js/[hash:8].[name].js',   // 输出文件目录 及文件名格式
  },
  module: {
    loaders: [  // 处理css  可以加less或sass
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({  // 提取公共代码
        name: 'base',
        chunks: ['index', 'list'],
        minChunks: 2 // 提取所有chunks共同依赖的模块 一个模块同时
    }),
    new HtmlWebpackPlugin({
      inject: 'body',  // 注入body
      chunks: ['base', 'index'], // 依赖模块
      filename: 'index.html', // 输出相对路径和文件名
      template: 'src/view/index.html', // 模版路径
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      chunks: ['base', 'list'],
      filename: 'list.html',
      template: 'src/view/list.html',
    })
  ]
}

module.exports = webpackConfig;
