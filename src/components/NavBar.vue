<template>
  <div class="navbar">
    <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    <div>
      <p>
        请输入搜索内容
        <van-icon class="ipt-icon" name="search" />
      </p>
    </div>
    <div>
      <img :src="imgUrl" alt="" @click="$router.push('/edit')" v-if="imgUrl" />
      <img
        src="@/assets/default_img.jpg"
        @click="$router.push('/login')"
        alt=""
        v-else
      />
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  async mounted() {
    if (localStorage.getItem("token")) {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.imgUrl = res.data[0].user_img;
    }
  }
};
</script>

<style lang="less" scope>
.navbar {
  height: 12.5vw;
  background: white;
  display: flex;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    img {
      width: 80%;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex: 1;
    align-items: center;
    margin: 0 5px;
    p {
      font-size: 12px;
      line-height: 23px;
      background-color: #f4f4f4;
      width: 90%;
      border-radius: 10px;
      height: 23px;
      position: relative;
      color: #aaa;
      padding-left: 25px;
      .ipt-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translate(0, -50%);
        color: #aaa;
      }
    }
  }
  div:nth-child(3) {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-content: center;
    }
    p {
      padding: 5px 10px;
      margin: 0 5px;
      background-color: #fb7299;
      color: white;
      border-radius: 3px;
      font-size: 13px;
    }
  }
}
</style>
