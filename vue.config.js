const path = require("path"),
  webpackConfig = require("./webpack.config.js");
const outputDir = process.env.NODE_ENV == "test" ? "dist-test" : "dist";
const name = "Hybrid-JD";
const sourceMap = process.env.NODE_ENV === "development";

module.exports = {
  // 应用程序将部署的base URL
  publicPath: "/",
  // 编译打包后的输出目录
  outputDir: outputDir,
  // 编译打包后的静态资源目录
  assetsDir: "assets",
  // 应用程序入口文件生成配置，支持多文件，至少包含应用入口
  pages: {
    index: {
      // 应用入口
      entry: "src/main.ts",
      // 模板文件
      template: "public/index.html",
      // 应用程序入口
      filename: "index.html"
    }
  },
  // souce map
  productionSourceMap: process.env.NODE_ENV !== "production",
  // 开启eslint
  lintOnSave: process.env.NODE_ENV === "development",
  // merge webpack config
  chainWebpack: config => {
    config.output.filename("[name].[hash].js").end();
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".json", ".vue", ".scss", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@js": path.resolve(__dirname, "./src/assets/js"),
        "@css": path.resolve(__dirname, "./src/assets/css"),
        "@imgs": path.resolve(__dirname, "./src/assets/imgs"),
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components")
      }
    },
    plugins: [...webpackConfig.plugins]
  },
  css: {
    // css相关配置
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  //   devServer: {
  //     open: true,
  //     compress: true,
  //     host: "localhost",
  //     port: devServerPort,
  //     hot: true,
  //     proxy:
  //       "https://vue-typescript-admin-mock-server.armour.now.sh/mock-api/v1/",
  //     // proxy: {
  //     //   // 设置代理
  //     //   // proxy all requests starting with /api to jsonplaceholder
  //     //   [process.env.VUE_APP_BASE_API]: {
  //     //     target: `http://localhost:${mockServerPort}/mock-api/v1`,
  //     //     changeOrigin: true,
  //     //     pathRewite: {
  //     //       ["^" + process.env.VUE_APP_BASE_API]: ""
  //     //     }
  //     //   }
  //     // },
  //     before: app => {} // 用于在服务器内部所有中间件执行前定义自定义处理程序，即此选项可在本地模拟服务器数据返回。参考https://github.com/lbwa/set/issues/8
  //   },
  // 第三方插件配置
  pluginOptions: {
    // style-resources-loader(https://www.npmjs.com/package/vue-cli-plugin-style-resources-loader)
    // 导入一些公共的样式文件，比如：variables / mixins / functions，避免在每个样式文件中手动的@import导入
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "src/assets/css/style.scss")]
    }
  }
};
