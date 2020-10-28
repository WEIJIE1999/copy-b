<template>
  <div class="userinfo">
    <NavBar></NavBar>
    <img src="@/assets/bannerTop_new.png" alt="" class="backImg" />
    <userComponent :userinfo="model"></userComponent>
    <userArticle></userArticle>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import userComponent from "@/components/userComponent.vue";
import userArticle from "@/components/userArticle.vue";
export default {
  data() {
    return {
      model: {}
    };
  },
  components: { NavBar, userComponent, userArticle },
  methods: {
    async UserData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    }
  },
  created() {
    this.UserData();
  }
};
</script>

<style lang="less" scope>
.userinfo {
  .backImg {
    height: 101px;
    width: 100%;
  }
}
</style>
