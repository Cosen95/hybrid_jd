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
      <mode-options></mode-options>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MySwiper from "@c/currency/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
@Component({
  name: "Home",
  components: {
    MySwiper,
    Activity,
    ModeOptions
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
