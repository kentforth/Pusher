module.exports = {
  devServer: {
    port: 4000
  },
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/styles.scss";`
      }
    }
  }
};
