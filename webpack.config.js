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
  },
  module: {
    rules: [
      {
        test: /[.]pegjs$/i,
        use: 'pegjs-loader?optimize=size',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  devServer: {},
  devtool: 'source-map',
};
