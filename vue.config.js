module.exports = {
//......上面一堆配置
  productionSourceMap: process.env.NODE_ENV === 'dev',
//......
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
  },
}
