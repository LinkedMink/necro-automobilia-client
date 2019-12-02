const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.local.config.js');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      "LOCAL_CONFIG": JSON.stringify(config)
    }),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    port: 8080
  }
});
