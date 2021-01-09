module.exports = {
  publicPath: "/",
  outputDir: "dist", // 构建输出目录
  assetsDir: "static",
  parallel: require("os").cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: {
    // 第三方插件配置
    plugins: [
    ]
  },
  pwa: {
    // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://127.0.0.1:21011/", //源地址
        changeOrigin: true, //改变源
        pathRewrite: {
          "^/api": "http://127.0.0.1:21011/" //路径重写
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    before: app => {}
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "home";
      return args;
    });
  }
};
