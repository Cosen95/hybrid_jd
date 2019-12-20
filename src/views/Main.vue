<template>
  <div class="main">
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ToolBar from "@c/ToolBar.vue";
@Component({
  name: "Main",
  components: {
    "tool-bar": ToolBar,
    // 异步加载组件
    home: () => import("@/views/Home.vue"),
    shopping: () => import("@/views/Shopping.vue"),
    my: () => import("@/views/My.vue")
  }
})
export default class extends Vue {
  private currentComponent = "home";
  private onChangeFragment(componentName: string) {
    this.currentComponent = componentName;
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
