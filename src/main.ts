import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@js/htmlFontSize.ts";
// import "@js/flexible.ts";
// 过滤器
import * as filters from "@/utils/filters.ts";
// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
