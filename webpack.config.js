const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  entry: {
    entry: './src/index.ts',
    components: './src/components.ts',
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.WATSON_URL': JSON.stringify(process.env.WATSON_URL),
      'process.env.APP_CLIP_BASE_URL': JSON.stringify(process.env.APP_CLIP_BASE_URL),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
};