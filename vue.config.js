module.exports = {
  devServer: {
    port: 5555,
    proxy: {
      '/offiac': {
        // target: 'http://localhost:4000',
        // target: 'http://mozbert.ngrok2.xiaomiqiu.cn',
        // target: 'https://sykj.huaweiopenlab.com',
        target: 'https://dvs-dev.sunlight-tech.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/offiac': '',
        },
      },
    },
  },
//......上面一堆配置
  productionSourceMap: process.env.NODE_ENV === 'dev',
//......
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
  },
}
