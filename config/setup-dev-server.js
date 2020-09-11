const path = require("path");
const webpack = require("webpack");
const MFS = require("memory-fs");
const clientConfig = require("./webpack.client.config");
const serverConfig = require("./webpack.server.config");

module.exports = setDevServer = (app) => {
  let serverBundle;
  let template;
  return new Promise((resolve, reject) => {
    clientConfig.entry.app = [
      "webpack-hot-middleware/client",
      clientConfig.entry.app,
    ];
    clientConfig.mode = "development";
    clientConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin({ multiStep: true }),
      new webpack.NoEmitOnErrorsPlugin() // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    );
    // DEV Middleware
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require("webpack-dev-middleware")(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      noInfo: true,
    });
    app.use(devMiddleware);
    clientCompiler.plugin("done", () => {
      const fs = devMiddleware.fileSystem;
      const filePath = path.join(clientConfig.output.path, "index.html"); // 模板为打包后的html文件
      if (fs.existsSync(filePath)) {
        template = fs.readFileSync(filePath, "utf-8");
        if (serverBundle) {
          resolve(serverBundle, template);
        }
      }
    });
    // HOT Middleware
    app.use(
      require("webpack-hot-middleware")(clientCompiler, {
        heartbeat: 5000,
      })
    );
    //  server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
      if (err) throw err;
      stats = stats.toJson();
      stats.errors.forEach((err) => console.error(err));
      stats.warnings.forEach((err) => console.warn(err));

      const bundlePath = path.join(
        serverConfig.output.path,
        "vue-ssr-server-bundle.json"
      );
      serverBundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
      if (template) {
        resolve(serverBundle, template);
      }
    });
  });
};
