const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isDevelopment = Boolean(env.development);
  // console.log(env.development);
  // console.log(env.production);
  return {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      app: path.resolve('src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true, // dọn dẹp thư mục sau khi build
    },
    devtool: isDevelopment ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss|css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    debug: true, // hiển thị debug lên terminal để debug
                    useBuiltIns: 'usage', // dùng cái này đơn giản nhất tự động tìm, không cần import core-js vào code file js
                    corejs: '3.33.0', // quy định version core-js để babel hoạt động tối ưu
                  },
                ],
              ],
            },
          },
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
};
