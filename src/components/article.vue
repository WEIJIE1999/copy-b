<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>({{ dataLength }})</span>
    </p>
    <div class="commentmyinfo">
      <img :src="myUser.user_img" alt="" v-if="myUser" />
      <img src="@/assets/default_img.jpg" alt="" v-else />
      <input
        ref="Postipt"
        v-model="comcontent"
        type="text"
        placeholder="说点什么吧"
      />
      <button @click="commentpublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["dataLength"],
  data() {
    return {
      myUser: null,
      comcontent: null
    };
  },
  methods: {
    async myUserinfo() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.myUser = res.data[0];
    },
    commentpublish() {
      if (
        !this.myuser &&
        !localStorage.getItem("token") &&
        !localStorage.getItem("id")
      ) {
        this.$msg.fail("请先登录");
        return;
      }
      this.$emit("Postcomment", this.comcontent);
      this.comcontent = "";
    },
    focusIpt() {
      this.$refs.Postipt.focus();
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.myUserinfo();
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 8.333vw 2.778vw 0 2.778vw;
  .comment-title {
    span:nth-child(2) {
      color: #aaa;
      margin-left: 2.778vw;
    }
  }
}
.commentmyinfo {
  padding: 2.778vw 0;
  display: flex;
  img {
    width: 7.944vw;
    height: 28.598px;
    border-radius: 50%;
  }
  input {
    outline: none;
    border: 0;
    background-color: #f4f4f4;
    border-radius: 3.611vw;
    font-size: 3.333vw;
    padding: 0 5.556vw 0 2.778vw;
    margin-left: 2.778vw;
  }
  button {
    outline: none;
    border: 0;
    border-radius: 12px;
    background-color: #fb7299;
    color: white;
    font-size: 12px;
    padding: 0 15px;
  }
}
</style>
