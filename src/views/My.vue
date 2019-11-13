<template>
  <div class="my">
    我的
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "My",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
