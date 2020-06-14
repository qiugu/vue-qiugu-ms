const path = require('path')
const glob = require('glob')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 打包速度分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

// 去除无用css 插件
const PurgecssPlugin = require('purgecss-webpack-plugin')

// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 基本路径
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: false,
  assetsDir: 'static',
  filenameHashing: true,
  transpileDependencies: [
    'vue-particles'
  ],

  // 高级的方式
  configureWebpack: config => {
    config.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    )

    config.plugins.push(
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, './src')}/**/*`, { nodir: true })
      })
    )

    config.plugins.push(
      new SpeedMeasurePlugin()
    )

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      // config.externals = externals

      config.plugins.push(
        new BundleAnalyzerPlugin({
          openAnalyzer: false
        })
      )
    }
  },

  // CSS 相关选项
  css: {
    sourceMap: false,
    loaderOptions: {} // 为所有的 CSS 及其预处理文件开启 CSS Modules。
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    port: 3001
    // proxy: 'http://localhost:8080'
  }
}
