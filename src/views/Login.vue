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
import { Md5 } from "ts-md5/dist/md5";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "Login",
  components: {
    NavigationBar
  }
})
export default class extends Vue {
  private username: string = "";
  private password: string = "";
  private md5Password: string | Int32Array = "";

  private onBackClick() {
    this.$router.go(-1);
  }
  private onLoginClick() {
    if (this.username.length === 0 || this.password.length === 0) {
      alert("用户名或密码未输入");
      return;
    }

    // 与原生交互，验证用户输入的用户名和密码
    // 对用户输入的密码进行 MD5 加密
    this.md5Password = Md5.hashStr(this.password);
    // 判断当前的项目是运行在 Android 设备还是 IOS 设备中
    if (window.androidJSBridge) {
      // window 下存在 android 注入的对象（androidJSBridge），则表示当前项目在 android 设备中运行
      this.onLoginToAndroid();
    } else if (window.webkit) {
      // window 下存在 webkit ，表示当前项目在 IOS 设备中运行
      // this.onLoginToIOS();
    }
  }
  /**
   * 调用 android 登录验证
   */
  private onLoginToAndroid() {
    // 创建 json 字符串
    let userJson = JSON.stringify({
      username: this.username,
      password: this.md5Password
    });

    // 调用 android 登录接口
    let result = window.androidJSBridge.login(userJson);
    // 对 android 的返回值进行处理
    this.onLoginCallback(result);
  }
  /**
   * 处理登录接口返回值
   */
  private onLoginCallback(result: string) {
    switch (result) {
      case "-1":
        alert("系统内部错误");
        break;
      case "0":
        // 保存主动登录的用户名到 username
        UserModule.setUsername(this.username);
        this.onBackClick();
        break;
      case "1":
        alert("登录用户不存在");
        break;
      case "2":
        alert("用户密码错误");
        break;
    }
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
