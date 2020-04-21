const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-qiugu-ms/' : '/',

  outputDir: 'dist',
  productionSourceMap: false,
  assetsDir: 'static',
  filenameHashing: true,
  transpileDependencies: [
    'vue-particles'
  ],

  // 高级的方式
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
      // config.externals = externals
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },

  // CSS 相关选项
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    requireModuleExtension: false
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    port: 3001
    // proxy: 'http://localhost:8080'
  }
}
