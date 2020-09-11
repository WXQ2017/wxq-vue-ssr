const Vue = require("vue");
const path = require("path");
const express = require("express");
const fs = require("fs");
const LRU = require("lru-cache");
const { createBundleRenderer } = require("vue-server-renderer");

function createRenderer(bundle, template) {
  return createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    // 缓存
    cache: new LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  });
}
let renderer;
const server = express();
const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  const bundle = require("../dist/vue-ssr-server-bundle.json");
  const template = fs.readFileSync(path.resolve("./dist/index.html"), "utf-8");
  renderer = createRenderer(bundle, template);
} else {
  // 开发模式需要设置 dev-server 和 hot-reload
  // TODO
}

server.get("*", (req, res) => {
  const context = { url: req.url };
  console.log(req.url);
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  //   createApp(context).then((app) => {
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end("Page not found");
      } else {
        res.status(500).end("Internal Server Error");
      }
      return;
    }
    res.end(html);
  });
  //   });
});
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});
const port = process.env.PORT || 8888;
server.listen(port, () => {
  console.log(`server run port:${port}`);
});