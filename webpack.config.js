// spell-checker:ignore PEGjs devTool
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'markdown-attr-parser',
    libraryTarget: 'umd',
    auxiliaryComment: 'istanbul ignore next', // HACK to remove coverage from ** wrapper code
    globalObject: 'typeof self !== "undefined" ? self : this', // needed for UMD wrapper; ref: <https://github.com/markdalgleish/static-site-generator-**-plugin/issues/130#issuecomment-445435821>
  },
  module: {
    rules: [
      // {
      //   test: /[.]js$/i,
      //   use: {
      //     loader: 'istanbul-instrumenter-loader',
      //     // options: {...options}
      //   },
      //   // enforce: 'post',
      // },
      {
        test: /[.]pegjs$/i,
        use: [
          // {
          //   loader: 'istanbul-instrumenter-loader',
          //   // options: {...options}
          // },
          {
            loader: 'pegjs-loader?optimize=size',
          },
        ],
      },
    ],
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  devServer: {},
  devtool: '',
};
