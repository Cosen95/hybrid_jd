<template>
  <div class="goods-list-page">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@imgs/back-2.svg" alt="" />
        </div>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper
        :swiperImgs="goodsData.swiperImgs"
        :height="SWIPER_IMAGE_HEIGHT + 'px'"
      ></my-swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";
import MySwiper from "@c/currency/MySwiper.vue";
import { goodsItemType } from "@/types/common.d.ts";

@Component({
  name: "GoodsDetail",
  components: {
    NavigationBar,
    MySwiper
  }
})
export default class extends Vue {
  private SWIPER_IMAGE_HEIGHT: number = 364;
  private navBarStyle: { [key: string]: string } = {
    backgroundColor: ""
  };
  private goodsData: goodsItemType = {};
  created() {
    this.goodsData = this.$route.params.goods;
  }

  private onBackClick() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped></style>
