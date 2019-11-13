// declare module "vue-awesome-swiper" {
// import Swiper, { SwiperOptions } from "swiper";
// import Vue, { PluginObject } from "vue";
// interface VueAwesomeSwiper extends PluginObject<SwiperOptions> {
//   Swiper: Swiper;
//   swiper: Vue;
//   swiperSlide: Vue;
// }
// const VueAwesomeSwiper: VueAwesomeSwiper;
// export default VueAwesomeSwiper;
// export const swiper: Vue;
// export const swiperSlide: Vue;
// export { default as Swiper } from "swiper";
// }

declare module "vue-awesome-swiper" {
  import Swiper, { SwiperOptions } from "swiper";
  import Vue, { PluginObject, VueConstructor } from "vue";

  interface VueAwesomeSwiper extends PluginObject<SwiperOptions> {
    Swiper: Swiper;
    swiper: VueConstructor<Vue>;
    swiperSlide: VueConstructor<Vue>;
  }

  const VueAwesomeSwiper: VueAwesomeSwiper;
  export default VueAwesomeSwiper;

  export const swiper: any;
  export const swiperSlide: VueConstructor<Vue>;
  export { default as Swiper } from "swiper";
}
