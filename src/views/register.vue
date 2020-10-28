<template>
  <div>
    <LoginTop middleTop="注册bilibili">
      <div slot="right" style="font-size:13px" @click="$router.push('/login')">
        登录
      </div>
    </LoginTop>
    <LoginText
      label="姓名"
      style="margin:4.167vw 0"
      rule="^.{6,16}$"
      placeholder="请输入姓名"
      @inputChange="content => (model.name = content)"
    />
    <LoginText
      label="账号"
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
    <LoginBtn btntext="注册" @registerSubmit="registerSubmit"></LoginBtn>
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
        name: "",
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
      if (
        rulg.test(this.model.name) &&
        rulg.test(this.model.username) &&
        rulg.test(this.model.password)
      ) {
        const res = await this.$http.post("/register", this.model);
        this.$msg.fail(res.data.msg);
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        this.$msg.fail("格式不正确，请重新输入");
      }
    }
  }
};
</script>

<style></style>
