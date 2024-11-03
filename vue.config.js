const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  configureWebpack: {
    devtool: "cheap-module-source-map",
  }, //配置后会使得productionSourceMap关闭
  // productionSourceMap: true//默认开启
});
