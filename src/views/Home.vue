<template>
  <div class="home">
    <div class="home-content">
      <!-- swiper -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img
            v-for="(item, index) in activityDatas"
            :src="item"
            alt
            :key="index"
          />
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀模块 -->
      <seconds :dataSource="secondsDatas"></seconds>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MySwiper from "@c/currency/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import { secondsType } from "@/types/common.d.ts";

@Component({
  name: "Home",
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds
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
  private activityDatas: string[] = [
    require("@imgs/520-1.gif"),
    require("@imgs/520-2.gif"),
    require("@imgs/520-3.gif")
  ];
  private secondsDatas: secondsType[] = [
    {
      icon: require("@imgs/goods/goods-2.jpg"),
      price: "4700",
      oldPrice: "6899"
    },
    {
      icon: require("@imgs/goods/goods-4.jpg"),
      price: "9.1",
      oldPrice: "29.9"
    },
    {
      icon: require("@imgs/goods/goods-7.jpg"),
      price: "2899",
      oldPrice: "3688"
    },
    {
      icon: require("@imgs/goods/goods-11.jpg"),
      price: "1799",
      oldPrice: "2299"
    }
  ];
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img {
        display: inline-block;
        width: 33.33%;
      }
    }
  }
}
</style>
