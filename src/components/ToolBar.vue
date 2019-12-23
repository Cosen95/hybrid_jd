<template>
  <div class="tool-bar">
    <div
      class="tool-bar-item"
      v-for="(item, index) in toolBarData"
      :key="index"
      @click="onChangeFragment(item, index)"
    >
      <img
        class="tool-bar-item-img"
        :src="[index === selectItemIndex ? item.hIcon : item.nIcon]"
        alt=""
        srcset=""
      />
      <p
        class="tool-bar-item-name"
        :class="{ 'tool-bar-item-name-h': index === selectItemIndex }"
      >
        {{ item.name }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { toolBarType } from "@/types/common.d.ts";

@Component({
  name: "ToolBar"
})
export default class extends Vue {
  private toolBarData: toolBarType[] = [
    {
      // 默认状态下的图片
      nIcon: require("@imgs/home-n.svg"),
      // 高亮状态下的图片
      hIcon: require("@imgs/home-h.svg"),
      // 名称
      name: "首页",
      // 组件名称
      componentName: "home"
    },
    {
      nIcon: require("@imgs/shopping-n.svg"),
      hIcon: require("@imgs/shopping-h.svg"),
      name: "购物车",
      componentName: "shopping"
    },
    {
      nIcon: require("@imgs/my-n.svg"),
      hIcon: require("@imgs/my-h.svg"),
      name: "我的",
      componentName: "my"
    }
  ];
  // 选中的 tab 按钮
  private selectItemIndex: number = 0;

  private onChangeFragment(item: toolBarType, index: number) {
    this.selectItemIndex = index;
    this.$emit("onChangeFragment", item.componentName);
  }
  private pushFragment(index: number) {
    // 指定切换的 tab 页
    // 调用 onChangeFragment 切换对应的 tab
    this.onChangeFragment(this.toolBarData[index], index);
  }
}
</script>
<style lang="scss" scoped>
// @import "@css/style.scss";
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;

  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }

    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);

      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
