// production webpack config
module.exports = require('./webpack.build.js')({
  cache: true,
  entry: {
    app: './src/index.js',
    shared: [
      'react',
      'react-router',
      'react-redux',
      'redux',
      'superagent',
      'lodash',
      'superagent-jsonp'
    ]
  },
  output: {
    publicPath: 'http://m.dianping.com/',
    path: 'dist/',
    jsName: 'app.js',
    chunkJsName: 'chunk.[id].js',
    imageLimit: 8192,
    imageName: '[name].[ext]',
    fontName: '[name].[ext]'
  },
  template: {
    filename: 'index.html',
    inject: 'body',
    src: 'src/index.tpl.html'
  },
  shared: {
    jsName: 'common.js',
    cssName: 'common.css'
  }
})
