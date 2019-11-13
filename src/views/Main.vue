<template>
  <div>
    <tool-bar></tool-bar>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import ToolBar from "@c/ToolBar.vue";
@Component({
  name: "Main",
  components: {
    ToolBar
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
