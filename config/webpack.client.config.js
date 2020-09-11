const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require("./webpack.base.config.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = merge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, "../src/entry-client.js"),
    vendor: ["vue", "vue-router", "vuex"],
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "vendors",
    //       priority: 1,
    //       minSize: 30000,
    //       chunks: "initial",
    //       minChunks: 1,
    //     },
    //   },
    // },
  },
  plugins: [
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
        title: 'vue-ssr',
        minify: { // 压缩HTML文件
          removeComments: false, // 移除HTML中的注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true// 压缩内联css
        },
        filename: 'index.html',
        template: path.resolve(__dirname, "../src/index.html"),
        chunks: ["app", "manifest"],
      }),
  ],
});
