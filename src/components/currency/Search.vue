<template>
  <div class="search" :style="{ backgroundColor: bgColor }">
    <img class="search-icon" :src="icon" alt="" />
    <span class="search-hint" :style="{ color: hintColor }"
      >奢侈品超级品类日</span
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Search",
  components: {}
})
export default class extends Vue {
  @Prop({ default: require("@imgs/search.svg") }) private icon!: string; // 图标
  @Prop({ default: "#999" }) private hintColor!: string; // 字体颜色
  @Prop({ default: "#fff" }) private bgColor!: string; // 背景颜色
}
</script>

<style lang="scss" scoped>
.search {
  background-color: white;
  width: 100%;
  margin: px2rem(6);
  border-radius: px2rem(22);
  display: flex;
  align-items: center;

  &-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }

  &-hint {
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $hintColor;
  }
}
</style>
