import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import ip from 'ip'
import colors from 'colors'
import open from 'open'
import webpackDevConfig from './webpack/webpack.dev.js'

const env = process.env.NODE_ENV
const port = process.env.PORT
const app = express()
const dashboard = new Dashboard()
const isDeveloping = env == 'development'

app.use(bodyParser.urlencoded({ extended: false }))

if (isDeveloping) {
  const compiler = webpack(webpackDevConfig)
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    contentBase: webpackDevConfig.contentBase,
    historyApiFallback: false,
    noInfo: true,
    hot: true,
    stats: {
      colors: true
    }
  })
  app.use(middleware)
  // inject dashboard
  compiler.apply(new DashboardPlugin(dashboard.setData))
  app.use(webpackHotMiddleware(compiler))
  app.get('/index.html', function response (req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')))
    res.end()
  })
} else {
  app.use(express.static(__dirname + '/build'))
  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}

app.listen(port, ip.address(), function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info('➦ Listening on  '.cyan + (ip.address() + ':' + port).magenta)
  open('http://' + ip.address() + ':' + port)
})
