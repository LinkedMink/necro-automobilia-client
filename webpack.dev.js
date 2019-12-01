const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      "LOCAL_CONFIG": JSON.stringify({
        userServiceUrl: "https://user.api.linkedmink.space",
        perferenceServiceUrl: "",
        necroAutomobiliaUrl: ""
      })
    }),
  ],
  devServer: {
    contentBase: './public',
    hot: true
  }
});
