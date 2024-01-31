const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "http://api.qinsx.de",
    createProxyMiddleware({
      target: "http://api.qinsx.de",
      changeOrigin: true,
    })
  );
};
