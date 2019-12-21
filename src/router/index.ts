import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/goodsList",
    name: "goodsList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "goods" */ "../components/goods/GoodsList.vue"
      )
  },
  {
    path: "/goodsDetail",
    name: "goodsDetail",
    component: () =>
      import(
        /* webpackChunkName: "goods" */ "../components/goods/GoodsDetail.vue"
      )
  },
  {
    path: "/buy",
    name: "buy",
    component: () => import(/* webpackChunkName: "buy" */ "@/views/Buy.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
