<template>
  <div
    class="nav-bar z-index-max"
    :style="navBarStyle"
    :class="[{ 'bottom-line': pageName }]"
  >
    <!-- 左 -->
    <div class="left">
      <img v-if="isShowBack" src="@imgs/back.svg" alt="" />
      <slot name="nav-left"></slot>
    </div>
    <!-- 中 -->
    <div class="center">
      <span class="page-title" v-if="pageName">{{ pageName }}</span>
      <slot name="nav-center"></slot>
    </div>
    <!-- 右 -->
    <div class="right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "NavigationBar",
  components: {}
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
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;
  // 适配沉浸式手机 statusBar
  // padding-top: $statusBarHeight;
  .left,
  .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;

    img {
      width: 100%;
      align-self: center;
    }
  }
  .center {
    display: flex;
    height: 100%;
    flex-grow: 1;

    .page-title {
      font-size: $titleSize;
      align-self: center;
      margin: 0 auto;
    }
  }
}
.bottom-line {
  border-bottom: 1px solid $lineColor;
}
</style>
