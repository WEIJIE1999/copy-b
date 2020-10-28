<template>
  <div>
    <LoginTop middleTop="登录bilibili">
      <div
        slot="right"
        style="font-size:13px"
        @click="$router.push('/register')"
      >
        注册
      </div>
    </LoginTop>
    <LoginText
      label="账号"
      style="margin:4.167vw 0"
      rule="^.{6,16}$"
      placeholder="请输入账号"
      @inputChange="content => (model.username = content)"
    />
    <LoginText
      label="密码"
      rule="^.{6,16}$"
      placeholder="请输入密码"
      type="password"
      @inputChange="content => (model.password = content)"
    />
    <LoginBtn btntext="登录" @registerSubmit="registerSubmit"></LoginBtn>
  </div>
</template>

<script>
import LoginTop from "@/components/LoginTop";
import LoginText from "@/components/LoginText";
import LoginBtn from "@/components/LoginBtn";
export default {
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    LoginTop,
    LoginText,
    LoginBtn
  },
  methods: {
    async registerSubmit() {
      let rulg = /^.{6,16}$/;
      if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
        const res = await this.$http.post("/login", this.model);
        this.$msg.fail(res.data.msg);
        if (res.data.code == 301 || res.data.code == 302) {
          return;
        }
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          this.$router.push("/userinfo");
        }, 1000);
      } else {
        this.$msg.fail("格式不正确，请重新输入");
      }
    }
  }
};
</script>

<style></style>
