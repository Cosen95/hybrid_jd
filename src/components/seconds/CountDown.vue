<template>
  <div class="count-down">
    <span class="count-down-end-time">{{ endHours }}点场</span>
    <span class="count-down-surplus">{{ surplus | filterTime }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "CountDown",
  components: {}
})
export default class extends Vue {
  @Prop({ default: 0 }) private endHours!: number;

  private surplus: string = "";
  private diffSeconds: number = 0;
  private interval: any = undefined;

  created() {
    this.computedSurplusTime();
  }

  /**
   * 当 diffSeconds 值发生变化的时候，就会回调当前的方法
   * 根据秒数来转化为对应的 -> 时:分:秒  （3600秒 展示 1:0:0）
   */
  @Watch("diffSeconds")
  private onDiffSecondsChange(value: number) {
    // 当前的秒数  / 3600 ,向下取整，获取到转化的小时数
    const hours = Math.floor(value / 3600);
    // 当前的秒数 / 60，向下取整，
    // 获取到所有的分钟数 3600 / 60 = 60分钟
    // 对60取模，超过小时数的分钟数
    const minutes = Math.floor(value / 60) % 60;
    // 当前的秒数 % 60 , 获取到 超过小时数、分钟数的秒数（秒数）
    const seconds = value % 60;
    // 拼装数据
    this.surplus = hours + ":" + minutes + ":" + seconds;

    /**
     * 在当前秒数 变为 0 ，需要修改展示数据
     */
    if (value === 0) {
      this.computedSurplusTime();
    }
  }
  /**
   * 监听 活动开始时间的变化
   */
  @Watch("endHours")
  private onEndHoursChange(value: number) {
    this.computedSurplusTime();
  }

  /**
   * 计算展示内容
   *  1、当前时间未到开始时间的时候 ： 展示倒计时
   * 2、当前时间到了开始时间的时候：活动进行中
   * 3、当前时间超过开始时间的时候：活动已结束
   */
  private computedSurplusTime() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    // 当前时间
    const date = new Date();
    /**
     * 当前时间超过开始时间的时候：活动已结束
     */
    if (date.getHours() > this.endHours) {
      this.surplus = "活动已结束";
      return;
    }
    /**
     * 当前时间到了开始时间的时候：活动进行中
     */
    if (date.getHours() === this.endHours) {
      this.surplus = "活动进行中";
      return;
    }
    /**
     * 当前时间未到开始时间的时候 ： 展示倒计时
     * 1、获取当前时间与活动开始时间的秒数差距
     * 2、根据秒数来转化为对应的 -> 时:分:秒
     */
    // 开始时间 16 ， 当前时间 12。 3小时59分59秒
    const diffHours = this.endHours - date.getHours() - 1;
    // 差距分钟数
    const diffMinutes = 60 - date.getMinutes() - 1;
    // 差距秒数
    const diffSeconds = 60 - date.getSeconds();
    // 转化为对应的秒数 -> 1小时 === 3600
    this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
    // 当前时间每过1秒，秒数差距应该 - 1
    this.interval = setInterval(() => {
      this.diffSeconds -= 1;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.count-down {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;

  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }

  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }

  &-surplus {
    background-color: white;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
