<template>
  <div class="number-manager">
    <span
      class="number-manager-less"
      :class="{ 'number-manager-disabled': number === 1 }"
      @click="onLessClick"
      >-</span
    >
    <span class="number-manager-number">{{ number }}</span>
    <span class="number-manager-add" @click="onAddClick">+</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "NumberManage",
  components: {}
})
export default class extends Vue {
  @Prop({ default: 1 }) private defaultNumber!: number; // 父组件指定的默认数量
  private number: number = 1; // 数量数据源
  private onLessClick() {
    // 减号按钮点击事件
    if (this.number === 1) {
      return;
    }
    this.number -= 1;
  }
  private onAddClick() {
    // 加号按钮点击事件
    this.number += 1;
  }
  @Watch("defaultNumber")
  private onDefaultNumberChange(val: number) {
    this.number = val;
  }
  @Watch("number")
  private onNumberChange(val: number) {
    this.$emit("onChangeNumber", val);
  }
}
</script>

<style lang="scss" scoped>
.number-manager {
  display: flex;
  font-size: $infoSize;
  height: px2rem(20);
  line-height: px2rem(20);

  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    font-weight: 500;
  }

  &-number {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }

  &-disabled {
    color: $hintColor;
  }
}
</style>
