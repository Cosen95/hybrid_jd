<template>
  <!-- 直营的标签 -->
  <span class="goods-item-name-direct">直营</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Direct",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.goods-item-name-direct {
  padding: 0 px2rem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: $mainColor;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
