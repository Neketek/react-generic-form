const path = require('path');
const webpack = require('webpack');


module.exports = (env={}) => {

  const BUILD_PATH = path.resolve(__dirname, 'dist');
  const APP_BUNDLE_PATH = BUILD_PATH;
  const CONTENT_BASE = BUILD_PATH;

  const {dev} = env;

  const mode = dev?'development':'production';

  const devtool = dev?"eval-source-map":false;

  const entry = {
    main:"./src/index"
  };

  const resolve = {
    extensions:[".js", ".jsx"],
    alias:{
      src:path.resolve(__dirname, 'src'),
    }
  };

  const output = {
    filename:'[name].min.js',
    path:APP_BUNDLE_PATH,
    library:"reactGenericForm",
    libraryTarget:"umd",
    umdNamedDefine:true
  };


  const externals = {
    // lodash:'lodash',
    react:'react',
    'prop-types':'prop-types'
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
        ]
      }
    }
  };

  module.rules.push(babelRule);

  const plugins = [];

  return {
    watch:true,
    watchOptions:{
      aggregateTimeout:600,
    },
    entry,
    output,
    externals,
    resolve,
    mode,
    module,
    plugins,
    devtool
  };

};
