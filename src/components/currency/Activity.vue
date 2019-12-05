<template>
  <div class="activty">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Activity",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.activty {
  max-height: px2rem(160);
  position: relative;
  z-index: 2;
}
</style>
