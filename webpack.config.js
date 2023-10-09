const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.resolve('src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss|css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html',
    }),
  ],
  devServer: {
    static: {
      directory: 'dist', // đường dẫn tương đối đến với thư mục chứa index.html
    },
    port: 3000, // port thay cho port mặc định (8080)
    open: {
      app: {
        name: 'chrome',
      },
    }, // mở trang web khi chạy webpack serve
    hot: true, // bật tính năng reload nhanh Hot Module Replacement
    compress: true, // bất Gzip cho các tài nguyên
    historyApiFallback: true, // set true nếu dùng cho SPA và sử dụng History API của HTML5, ví dụ sử dụng React router không bị lỗi
  },
};
