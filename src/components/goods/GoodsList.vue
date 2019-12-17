<template>
  <div class="goods-list-page">
    <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()" />
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
      <goods :layoutType="layoutType.type"></goods>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";
import GoodsOptions from "@c/goods/GoodsOptions.vue";
import Goods from "@c/goods/Goods.vue";

interface layoutTypes {
  type?: string;
  icon?: string;
}
@Component({
  name: "GoodsList",
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  }
})
export default class extends Vue {
  @Prop({ default: "" }) private pageName!: string;
  @Prop({
    default: () => {
      backgroundColor: "white";
    },
    required: true
  })
  private navBarStyle!: {};
  @Prop({ default: true }) private isShowBack!: boolean;

  // goods 展示形式数据源
  private layoutTypeDatas = [
    {
      // 垂直列表
      type: "1",
      icon: require("@imgs/list-type.svg")
    },
    {
      // 网格布局
      type: "2",
      icon: require("@imgs/grid-type.svg")
    },
    {
      // 瀑布流
      type: "3",
      icon: require("@imgs/waterfall-type.svg")
    }
  ];
  // 当前 goods 展示形式
  private layoutType: layoutTypes = {};

  created() {
    this.layoutType = this.layoutTypeDatas[0];
  }
  private onChangeLayoutTypeClick() {
    if (this.layoutType.type === "1") {
      this.layoutType = this.layoutTypeDatas[1];
    } else if (this.layoutType.type === "2") {
      this.layoutType = this.layoutTypeDatas[2];
    } else {
      this.layoutType = this.layoutTypeDatas[0];
    }
  }
  private onBackClick() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
.goods-list-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;

  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
