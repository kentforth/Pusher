

module.exports = {
  devServer: {
    port: 4000
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/styles.scss";`
      },
    },
  }
};
