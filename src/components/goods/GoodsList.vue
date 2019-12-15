<template>
  <div class="goods-list-page">
    <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";
import GoodsOptions from "@c/goods/GoodsOptions.vue";

@Component({
  name: "GoodsList",
  components: {
    NavigationBar,
    GoodsOptions
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
