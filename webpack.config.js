const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env={}) => {

  const BUILD_PATH = path.resolve(__dirname, 'dist');
  const APP_BUNDLE_PATH = BUILD_PATH;
  const CONTENT_BASE = BUILD_PATH;

  const {dev} = env;

  const mode = dev?'development':'production';

  const devtool = dev?"eval-source-map":true;

  const entry = {
    main:"./src/index"
  };

  const resolve = {
    extensions:[".js", ".jsx"],
    alias:{
      src:path.resolve(__dirname, 'src')
    }
  };

  const output = {
    filename:'[name].min.js',
    path:APP_BUNDLE_PATH
  };


  const module = {
    rules:[]
  };

  const babelRule = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use:{
      loader: 'babel-loader',
      options:{
        presets:[
          "@babel/preset-env",
          "@babel/preset-react"
        ]
      }
    }
  };

  module.rules.push(babelRule);

  const plugins = [];

  return {
    entry,
    output,
    resolve,
    mode,
    module,
    plugins,
    devtool
  };

};