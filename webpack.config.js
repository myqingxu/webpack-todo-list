const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash:16].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '主页',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:8].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.stylus$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'stylus-loader',
          },
        ],
      },
      {
        // 在编译js文件时，使用babel-loader加载器，但是编译的文件中不包括node-modules下的第三方库
        test: /\.js$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    open: true, // 默认是否打开浏览器
  },
}
