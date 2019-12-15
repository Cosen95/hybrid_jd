<template>
  <!-- 缺货的标签 -->
  <span class="goods-item-name-no-have">缺货</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "NoHave",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.goods-item-name-no-have {
  padding: 0 px2rem(4);
  font-size: $minInfoSize;
  color: white;
  background-color: #999999;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
