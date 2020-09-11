const path = require("path")
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, "../src/entry-server.js"),
  // output: {
  //   path: path.resolve(__dirname, "../dist"),
  //   publicPath: "/dist/server",
  //   libraryTarget: 'commonjs2'
  // },
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },

  externals: Object.keys(require('../package.json').dependencies),
  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [
    new VueSSRServerPlugin()
  ]
})