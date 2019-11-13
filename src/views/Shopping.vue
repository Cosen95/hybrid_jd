<template>
  <div class="shopping">
    购物车
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "Shopping",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
