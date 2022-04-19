const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const times = new Date().getTime();
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("@$", resolve("src"));
  },
  configureWebpack: {
    devServer: {
      public: "192.168.0.164:8080",
      hot: true,
      disableHostCheck: true,
    },
  },
  devServer: {
    open: true, // 是否打开浏览器
    proxy: {
      "/": {
        target: "192.168.0.164:8080", // 目标代理接口地址 开发环境
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
