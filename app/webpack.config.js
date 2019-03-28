const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env={}) => {

  const BUILD_PATH = path.resolve(__dirname, 'build');
  const APP_BUNDLE_PATH = BUILD_PATH;
  const HTML_TEMPLATE_PATH = path.resolve(BUILD_PATH, 'templates', 'index.html');
  const CONTENT_BASE = BUILD_PATH;

  const {dev} = env;

  const mode = dev?'development':'production';

  const devtool = dev?"eval-source-map":true;

  const entry = {
    app:dev?'./entry/dev.jsx':"./entry/prod.jsx"
  };

  const resolve = {
    extensions:[".js", ".jsx"],
    symlinks:false,
    alias:{
      src:path.resolve(__dirname, 'src'),
    },
    // modules:[
    //   "/node_modules"
    // ]
  };

  const output = {
    filename:'[name].min.js',
    path:APP_BUNDLE_PATH
  };

  const devServer = {
    publicPath:'/',
    contentBase:CONTENT_BASE,
    disableHostCheck:false,
    hot: true,
    compress:true,
    port:80,
    host:'0.0.0.0'
  }

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
        ],
        plugins:["babel-plugin-styled-components"]
      }
    }
  };

  module.rules.push(babelRule);

  const plugins = [];

  if(dev){
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  plugins.push(new HtmlWebpackPlugin({
    template:HTML_TEMPLATE_PATH,
    inject:true
  }));

  return {
    entry,
    output,
    devServer,
    resolve,
    mode,
    module,
    plugins,
    devtool
  };

};
