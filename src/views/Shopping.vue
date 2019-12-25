<template>
  <div class="shopping">
    购物车
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ShoppingModule } from "@/store/modules/shopping";

@Component({
  name: "Shopping",
  components: {}
})
export default class extends Vue {
  get shoppingDatas() {
    return ShoppingModule.shoppingDatas;
  }
  created() {
    console.log("购物车数据", this.shoppingDatas);
  }
}
</script>

<style lang="scss" scoped>
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
