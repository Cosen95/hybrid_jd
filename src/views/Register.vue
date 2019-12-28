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
