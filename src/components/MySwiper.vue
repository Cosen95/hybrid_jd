<template>
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
      <img class="swiper-slide-img" :style="{height: height}" :src="item" alt srcset />
    </swiper-slide>

    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";
@Component({
  name: "MySwiper",
  components: {
    swiper,
    swiperSlide
  }
})
export default class extends Vue {
  @Prop({ default: "auto" }) private height!: string;
  @Prop({ default: () => [], required: true }) private swiperImgs!: string[];
  @Prop({ default: "1" }) private paginationType!: string;

  private swiperOptions = {
    // 自动滚动
    autoplay: true,
    // swiper 高度 跟随 slide 高度变化
    autoHeight: true,
    // 分页器设置效果
    pagination: {
      // 分页器对应的 html 元素
      el: ".swiper-pagination",
      // 分页器的样式
      type: "bullets",
      // 分页器内的元素，添加类名
      bulletClass: "custom-bullet-class"
    }
  };
}
</script>

<style lang="scss" scoped>
.swiper-slide-img {
  width: 100%;
}
</style>
