import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

module.exports = (option) => {
  return {
    cache: option.cache,
    entry: option.entry,
    output: {
      path: option.output.path,
      filename: option.output.jsName,
      chunkFilename: option.output.chunkJsName
    },
    module: {
      loaders: [{
        test: /\.less$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }, {
        test: /\.(jpe?g|gif|png|ico|svg)$/,
        loader: 'url?limit=' + option.output.imageLimit + '&name=' + option.output.imageName
      }, {
        test: /\.(woff2?|otf|eot|ttf)$/i,
        loader: 'url?name=fonts/' + option.output.fontName
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    },
    resolve: {
      modulesDirectories: [
        'src',
        'node_modules'
      ],
      extensions: ['', '.js', '.jsx']
    },
    postcss: function () {
      return [
        require('autoprefixer'),
        require('precss')
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: option.template.filename,
        inject: option.template.inject,
        template: option.template.src
      }),
      new webpack.optimize.CommonsChunkPlugin(option.shared.jsName),
      new ExtractTextPlugin(option.shared.cssName),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
    devtool: option.devtool
  }
}
