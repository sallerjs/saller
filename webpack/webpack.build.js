import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import StatsPlugin from 'stats-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ip from 'ip'

const port = process.env.PORT

module.exports = (option) => {
  return {
    cache: option.cache,
    entry: option.entry,
    output: {
      path: option.output.path,
      filename: option.output.jsName,
      chunkFilename: option.output.chunkJsName,
      publicPath: option.output.publicPath
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.json', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'css?-minimize!' + 'autoprefixer-loader!' + 'less'
        )
      }, {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel',
        exclude: path => {
          return !!path.match(/node_modules/)
        }
      }, {
        test: /\.json?$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      }, {
        test: /\.(jp?g|gif|png|woff|ico)$/,
        loaders: ['url-loader?limit=' + option.output.imageLimit + '&name=' + option.output.imageName, 'img?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80"}}']
      }]
    },
    imagemin: {
      gifsicle: {
        interlaced: false
      },
      jpegtran: {
        progressive: true,
        arithmetic: false
      },
      optipng: {
        optimizationLevel: 5
      },
      pngquant: {
        floyd: 0.5,
        speed: 2
      },
      svgo: {
        plugins: [{
          removeTitle: true
        }, {
          convertPathData: false
        }]
      }
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
        filename: option.template.filename,
        inject: option.template.inject,
        template: option.template.src
      }),
      new StatsPlugin('webpack.stats.json', {
        source: false,
        modules: true
      }),
      new ExtractTextPlugin(option.shared.cssName),
      new webpack.optimize.CommonsChunkPlugin(option.shared.jsName),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        cache: false,
        compressor: {
          warnings: false,
          screw_ie8: false
        },
        output: {
          comments: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
    postcss: [
      require('autoprefixer')
    ],
    devtool: option.devtool
  }
}
