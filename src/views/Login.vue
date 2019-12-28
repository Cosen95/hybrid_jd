<template>
  <div class="login-page">
    <navigation-bar
      :pageName="'登录'"
      @onLeftClick="onBackClick"
    ></navigation-bar>

    <!-- 内容区 -->
    <div class="login-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input v-model="username" type="text" placeholder="用户名" />
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input v-model="password" type="password" placeholder="密码" />
      </div>

      <div class="login-page-content-login page-commit" @click="onLoginClick">
        登录
      </div>

      <a class="login-page-content-register" @click="onToRegisterClick"
        >注册新用户</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";

@Component({
  name: "Login",
  components: {
    NavigationBar
  }
})
export default class extends Vue {
  private username: string = "";
  private password: string = "";
  private onBackClick() {
    this.$router.go(-1);
  }
  private onLoginClick() {
    if (this.username.length === 0 || this.password.length === 0) {
      alert("用户名或密码未输入");
      return;
    }

    // 与原生交互，验证用户输入的用户名和密码
  }
  private onToRegisterClick() {
    this.$router.push({
      name: "register",
      params: {
        routerType: "push"
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  // 页面组件过渡动画，脱离标准文档流
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;

  &-content {
    width: 100%;
    height: 100%;

    &-login {
      margin-top: 40%;
    }

    &-register {
      font-size: $infoSize;
      color: $hintColor;
      margin-top: $marginSize;
      padding: $marginSize;
      float: right;
    }
  }
}
</style>
