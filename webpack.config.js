const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

module.exports = {
  mode: environment,
  entry: [path.resolve(__dirname, 'src/styles/index.scss'), path.resolve(__dirname, 'src/index.js')],
  output: {
    path: path.resolve(__dirname, 'tmp'),
    filename: 'afosto-instant-search-widget.min.js',
    library: 'AfostoInstantSearchWidget',
    libraryExport: 'default',
    globalObject: 'window',
  },
  optimization: {
    minimize: environment === 'production',
  },
  devServer: {
    host: 'localhost',
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...(environment === 'development' ? [
      new HtmlWebpackPlugin({
        inject: 'body',
        template: 'playground/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ] : []),
  ]
};
