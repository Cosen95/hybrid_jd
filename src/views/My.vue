<template>
  <div class="my">
    <navigation-bar :pageName="'个人中心'" :isShowBack="false"></navigation-bar>
    <div class="my-content">
      <!-- 头部区域 -->
      <div class="my-content-header">
        <img class="my-content-header-avater" src="@imgs/avater.png" alt="" />
        <p class="my-content-header-login">
          登录/注册
        </p>
      </div>

      <!-- 工具栏区域 -->
      <div class="my-content-tools">
        <div
          class="my-content-tools-item"
          v-for="(item, index) in toolsData"
          :key="index"
        >
          <p class="my-content-tools-item-name">{{ item }}</p>
          <img
            class="my-content-tools-item-arrow"
            src="@imgs/right-arrow.svg"
            alt=""
          />
        </div>
      </div>

      <!-- 存在登录用户，展示退出登录按钮 -->
      <!-- <div
        class="my-content-logout page-commit"
        v-if="$store.state.username"
        @click="onLogoutClick"
      >
        退出登录
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";

@Component({
  name: "My",
  components: {
    NavigationBar
  }
})
export default class extends Vue {
  private toolsData: string[] = [
    "全部订单",
    "我的预约",
    "应用推荐",
    "用户福利"
  ];
}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: $bgColor;

  &-content {
    height: 100%;
    width: 100%;

    // 头部区域
    &-header {
      margin-top: $marginSize;
      background-color: white;
      height: px2rem(68);
      display: flex;
      align-items: center;
      border-top: px2rem(1) solid $lineColor;
      border-bottom: px2rem(1) solid $lineColor;
      padding: $marginSize;

      &-avater {
        width: px2rem(52);
        height: px2rem(52);
      }

      &-login {
        margin-left: $marginSize;
        font-size: $titleSize;
      }
    }

    // 工具栏
    &-tools {
      &-item {
        display: flex;
        height: px2rem(46);
        box-sizing: border-box;
        align-items: center;
        padding: $marginSize;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;

        &-name {
          font-size: $infoSize;
          flex-grow: 1;
        }

        &-arrow {
          width: px2rem(16);
        }
      }
    }

    // 退出登录按钮
    &-logout {
      margin-top: 20%;
    }
  }
}
</style>
