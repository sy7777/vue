module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 4500,
    disableHostCheck: true,
  },
  chainWebpack: (config) => {},
  configureWebpack: (config) => {
    const { output } = config;

    output.filename = "js/[name]-[hash].js";
    output.chunkFilename = "js/[name]-[hash].js";
  },
};
