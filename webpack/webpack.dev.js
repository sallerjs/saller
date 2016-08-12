// develop webpack config
module.exports = require('./webpack.local.js')({
  devtool: 'source-map',
  cache: true,
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: '/build/',
    jsName: 'app.[hash:4].js',
    chunkJsName: 'chunk.[id].[hash:4].js',
    imageLimit: 8192,
    imageName: '[name].[hash:4].[ext]',
    fontName: '[name].[hash:4].[ext]'
  },
  template: {
    filename: 'index.html',
    inject: 'body',
    src: 'src/index.tpl.html'
  },
  shared: {
    jsName: 'common.[hash:4].js',
    cssName: 'common.[hash:4].css'
  }
})
