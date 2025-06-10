const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  plugins: [
    new Dotenv(),
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 8192,
        }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/yup-password/,
        ],
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/],
};