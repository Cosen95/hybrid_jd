<template>
  <!-- 
        视差效果：让多层背景以不同的速度去进行移动。
        1、至少需要拥有两层背景（缓慢移动区、正常移动区）
        2、将背景设置为相对布局（为缓慢移动区设置 top 来缓冲掉 scroll 滚动）
        3、监听 Parallax 组件的滑动，根据滑动来计算 缓慢移动区 top 的值。
     -->
  <div class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{ top: slowTop }">
      <slot name="parallax-slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { secondsType } from "@/types/common.d.ts";

@Component({
  name: "Parallax",
  components: {}
})
export default class extends Vue {
  private SPEED_DIFF: number = 2; // 速度差(正常移动区移动100px， 缓慢移动区 100 / 2 = 50 px)；
  private parallaxScroll: number = 0; // 页面滑动值
  public get slowTop() {
    // 返回 slow 距离顶部的距离
    // 当前页面的滑动距离 / 速度差 = 缓慢移动区应该滑动的距离
    // 当前页面的滑动距离 - 缓慢移动区应该滑动的距离 = 缓慢移动区用来缓冲掉 scroll 的值
    return this.parallaxScroll - this.parallaxScroll / this.SPEED_DIFF + "px";
  }
  private onScrollChange($event: any) {
    this.parallaxScroll = $event.target.scrollTop;
    this.$emit("onScrollChange", this.parallaxScroll);
  }
}
</script>

<style lang="scss" scoped>
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &-slow {
    width: 100%;
    position: relative;
  }

  &-content {
    width: 100%;
    position: relative;
  }
}
</style>
