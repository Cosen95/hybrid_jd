<template>
  <div class="home">
    <div class="home-content">
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MySwiper from "@c/MySwiper.vue";
@Component({
  name: "Home",
  components: {
    MySwiper
  }
})
export default class extends Vue {
  private swiperImgs: string[] = [
    require("@imgs/swiper-1.jpg"),
    require("@imgs/swiper-2.jpg"),
    require("@imgs/swiper-3.jpg"),
    require("@imgs/swiper-4.jpg"),
    require("@imgs/swiper-5.jpg"),
    require("@imgs/swiper-6.jpg"),
    require("@imgs/swiper-7.jpg"),
    require("@imgs/swiper-8.jpg")
  ];
  private swiperHeight: string = "184px";
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  &-content {
    height: 100%;
  }
}
</style>
