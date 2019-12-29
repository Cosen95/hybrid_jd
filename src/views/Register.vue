<template>
  <div class="register-page">
    <navigation-bar
      :pageName="'注册'"
      @onLeftClick="onBackClick"
    ></navigation-bar>

    <!-- 内容区 -->
    <div class="register-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input v-model="username" type="text" placeholder="用户名" />
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input v-model="password" type="password" placeholder="密码" />
      </div>
      <!-- 确认密码 -->
      <div class="input-container">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="确认密码"
        />
      </div>

      <div
        class="register-page-content-register page-commit"
        @click="onRegisterClick"
      >
        注册
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationBar from "@c/currency/NavigationBar.vue";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  name: "Register",
  components: {
    NavigationBar
  }
})
export default class extends Vue {
  private username: string = "";
  private password: string = "";
  private confirmPassword: string = "";
  private md5Password: string | Int32Array = "";
  private onBackClick() {
    this.$router.go(-1);
  }
  private onRegisterClick() {
    if (this.username.length === 0) {
      alert("请完善用户名");
      return;
    }
    if (this.password.length === 0 || this.password != this.confirmPassword) {
      alert("请完善密码");
      return;
    }

    // 与原生交互，保存用户输入的用户名和密码
    // 对用户输入的密码进行 MD5 加密
    this.md5Password = Md5.hashStr(this.password);
    console.log("加密后", this.md5Password);

    // 判断当前的项目是运行在 Android 设备还是 IOS 设备中
    if (window.androidJSBridge) {
      // window 下存在 android 注入的对象（androidJSBridge），则表示当前项目在 android 设备中运行
      this.onRegisterToAndroid();
    } else if (window.webkit) {
      // window 下存在 webkit ，表示当前项目在 IOS 设备中运行
      this.onRegisterToIOS();
    }
  }
  /**
   * 调用 android 注册接口
   */
  private onRegisterToAndroid() {
    // json 字符串，Android 只能接收基本类型参数
    let userJson = JSON.stringify({
      username: this.username,
      password: this.md5Password
    });
    // 调用 android 注册方法，接收他的返回值
    let result = window.androidJSBridge.register(userJson);
    // 对返回值进行处理
    this.onRegisterCallback(result);
  }
  /**
   * 调用 IOS 注册接口
   */
  private onRegisterToIOS() {
    // IOS 可以直接接收对象类型参数
    let userObj = {
      username: this.username,
      password: this.md5Password
    };

    /**
     * IOS 不能直接返回返回值，所以 IOS 操作完成之后会回调对应的回调方法。
     * 同时原生调用 JS 的方法只能使调用 绑定到 window 对象中的方法。
     * 所以我们需要把 IOS 操作完成之后的回调方法 (registerCallback) 绑定到 window 对象下
     */
    window.registerCallback = this.onRegisterCallback;

    // 调用 IOS 注册方法
    window.webkit.messageHandlers.register.postMessage(userObj);
  }
  /**
   * 用来处理 Native 注册接口的返回值
   */
  private onRegisterCallback(result) {
    if (result) {
      alert("注册成功");
      this.onBackClick();
    } else {
      alert("注册失败，请重试！");
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;

  &-content {
    width: 100%;
    height: 100%;

    &-register {
      margin-top: 40%;
    }
  }
}
</style>
