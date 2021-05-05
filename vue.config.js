const path = require('path')
const packageInfo = require('./package.json')
const isProd = process.env.NODE_ENV === 'production'
const isBuildLib = (process.env.npm_lifecycle_script || '').includes('--target lib')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isProd ? '/vant-components/' : '/',
  outputDir: isBuildLib ? 'dist' : 'dist/example',
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'example/main.js',
      cdn: {
        css: [
          'https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css'
        ],
        js: isProd
            ? [
              'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
              'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
              'https://cdn.jsdelivr.net/npm/vant@2.12.15/lib/vant.min.js'
            ]
            : []
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    port: 8079,
    historyApiFallback: false
  },
  configureWebpack: {
    name: packageInfo.name,
    resolve: {
      alias: {
        '@example': resolve('example')
      }
    },
    externals: isProd
        ? {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'vant': 'vant'
        }
        : {}
  },
  chainWebpack: config => {
    if (isBuildLib) {
      config.output.library('VantComponents')
    }
    /*else {
        config.plugin('html-index').tap((args) => {
            args[0].scriptLoading = 'blocking'
            args[0].publicPath = 'auto'
            return args
        })
    }*/
  }
}
