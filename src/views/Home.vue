<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 左侧插槽 -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="" />
      </template>
      <!-- 中间插槽 -->
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon"
        >
        </search>
      </template>
      <!-- 右侧插槽 -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="" />
      </template>
    </navigation-bar>
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
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@imgs/pinGouJie.gif" alt="" srcset="" />
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods></goods>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";
import Search from "@c/currency/Search.vue";
import MySwiper from "@c/currency/MySwiper.vue";
import Activity from "@c/currency/Activity.vue";
import ModeOptions from "@c/currency/ModeOptions.vue";
import Seconds from "@c/seconds/Seconds.vue";
import Goods from "@c/goods/Goods.vue";
import { secondsType } from "@/types/common.d.ts";
import { getGoods } from "../services/goods";

@Component({
  name: "Home",
  components: {
    NavigationBar,
    Search,
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods
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
  private navBarSlotStyle = {
    // navBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式 (默认样式)和 页面滑动到锚定点之后的插槽的样式（高亮样式）
    // 默认样式
    normal: {
      // 左侧插槽
      leftIcon: require("@imgs/more-white.svg"),
      // 中间插槽
      search: {
        bgColor: "#ffffff",
        hintColor: "#999999",
        icon: require("@imgs/search.svg")
      },
      // 右侧插槽
      rightIcon: require("@imgs/message-white.svg")
    },
    // 高亮样式
    highlight: {
      // 左侧插槽
      leftIcon: require("@imgs/more.svg"),
      // 中间插槽
      search: {
        bgColor: "#d7d7d7",
        hintColor: "#ffffff",
        icon: require("@imgs/search-white.svg")
      },
      // 右侧插槽
      rightIcon: require("@imgs/message.svg")
    }
  };
  // navBar 当前使用的插槽样式
  private navBarCurrentSlotStyle = {};
  // navBar 的定制样式,
  private navBarStyle = {
    position: "fixed",
    backgroundColor: ""
  };
  // 记录页面滚动值
  private scrollTopValue: number = -1;
  // 锚点值
  private ANCHOR_SCROLL_TOP: number = 160;
  created() {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
  }
  /**
   * 监听页面滚动
   * 1、获取到当前页面滚动的距离
   * 2、计算 navBar 背景颜色（navBar 背景透明度）
   *    当前滚动的距离 / 锚点值 = navBar 背景透明度  opacity
   * 3、opacity >= 1 ， 当前滚动的距离 已经等于或者超过了 锚点值，当前 navBar 插槽的样式变为 高亮状态的样式。
   *   否则的话 opacity < 1 ,当前 navBar 插槽的样式，为 默认状态的样式
   */
  private onScrollChange($event: object) {
    // 获取到当前页面滚动的距离
    this.scrollTopValue = $event.target.scrollTop;
    // 计算 navBar 背景颜色（navBar 背景透明度）
    let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
    // 指定 narBar 插槽样式
    if (opacity >= 1) {
      this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
    } else {
      this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
    }
    // 根据透明比例来设置 navBar 的背景颜色
    this.navBarStyle.backgroundColor = `rgba(255,255,255, ${opacity})`;
  }
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
    .activity-pin-gou-jie {
      background-color: white;
      margin-top: $marginSize;

      img {
        width: 100%;
      }
    }
  }
}
</style>
