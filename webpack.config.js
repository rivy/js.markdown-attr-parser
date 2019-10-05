// spell-checker:ignore PEGjs devTool
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'markdown-attr-parser',
    libraryTarget: 'commonjs2',
    globalObject: 'typeof self !== "undefined" ? self : this', // needed for UMD wrapper; ref: <https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130#issuecomment-445435821>
  },
  module: {
    rules: [
      {
        test: /[.]pegjs$/i,
        use: 'pegjs-loader?optimize=size',
      },
    ],
  },
  devServer: {},
  devtool: 'source-map',
};
