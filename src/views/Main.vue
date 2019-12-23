<template>
  <div class="main">
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
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
  activated() {
    // 在 keepAlive 被激活的时候，调用指定加载页面组件的方法
    this.pushFragment();
  }
  private pushFragment() {
    // 指定加载的页面组件
    // 获取到组件加载的下标
    let componentIndex = this.$route.params.componentIndex;
    // 如果没有下标的话，直接让方法 return 掉。
    if (componentIndex === undefined) return;
    // 通过 toolbar 来切换对应的组件
    this.$refs.toolBar.pushFragment(componentIndex);
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
