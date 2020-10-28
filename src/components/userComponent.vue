<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userinfo.user_img" alt="" v-if="userinfo.user_img" />
        <img src="@/assets/default_img.jpg" alt="" v-else />
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>54</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div class="user_editBtn" @click="$router.push('edit')">编辑资料</div>
      </div>
    </div>
    <div>
      <h2>{{ userinfo.name }}</h2>
      <p v-if="userinfo.user_desc">{{ userinfo.user_desc }}</p>
      <p v-else>这个人很神秘,什么都没有留下</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userinfo"]
};
</script>

<style lang="less" scope>
.userdetail {
  background-color: white;
  padding: 0vw 3.333vw;
  > div:nth-child(1) {
    display: flex;
    .user_img {
      margin-right: 5.556vw;
      img {
        height: 23.611vw;
        width: 23.611vw;
        border-radius: 50%;
      }
    }
    .user_edit {
      flex: 1;
      div:nth-child(1) {
        display: flex;
        p {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 3.611vw;
          margin: 3.611vw 0;
          .user_text {
            color: #aaa;
          }
        }
        p:nth-child(1),
        p:nth-child(2) {
          border-right: 0.278vw solid #ccc;
        }
      }
      .user_editBtn {
        border: 0.278vw solid #fb7a9f;
        padding: 1.389vw, 2.778vw;
        text-align: center;
        color: #fb7a9f;
        border-radius: 0.833vw;
      }
    }
  }
  > div:nth-child(2) {
    h2 {
      margin: 2.778vw 0 0.833vw 0;
      font-weight: 400;
    }
    p {
      padding: 0;
      margin: 2.778vw 0;
      color: #999;
    }
  }
}
</style>
