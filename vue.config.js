module.exports = {
  devServer: {
    port: 5555,
    proxy: {
      "/offiac": {
        target: "http://localhost:4000", // 接口地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/offiac": ""
        }
      }
    }
  },
  /*
    默认为true,会将项目中的css文件抽离到单独的css文件中,使用时需要单独import使用
    设置为false,则会直接一起打包了
  */
  css: {
    extract: false
  },
  //......上面一堆配置
  productionSourceMap: process.env.NODE_ENV === "dev",
  //......
  configureWebpack: {
    devtool: process.env.NODE_ENV === "dev" ? "source-map" : undefined
  }
};
