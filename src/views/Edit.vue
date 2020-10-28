<template>
  <div v-if="model" class="editViews">
    <div style="margin-bottom:20px"><NavBar></NavBar></div>
    <div class="uploadfile">
      <van-uploader
        preview-size="100vw"
        class="uploading"
        :after-read="afterRead"
      />
      <editBanner left="头像">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img" />
        <img src="@/assets/default_img.jpg" alt="" slot="right" v-else />
      </editBanner>
    </div>
    <editBanner left="昵称" @bannerClick="show = true">
      <a href="javascript:;" slot="right">{{ model.name }}</a>
    </editBanner>
    <editBanner left="账号">
      <a href="javascript:;" slot="right">{{ model.username }}</a>
    </editBanner>
    <editBanner left="性别" @bannerClick="gendershow = true">
      <a href="javascript:;" slot="right">{{
        model.gender == 1 ? "男" : "女"
      }}</a>
    </editBanner>
    <editBanner left="个人签名" @bannerClick="textshow = true"></editBanner>
    <div class="editback" @click="$router.back()">返回个人中心</div>

    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
    <van-dialog
      v-model="textshow"
      title="个人签名"
      show-cancel-button
      @confirm="textareaClick"
      @cancel="content = ''"
    >
      <van-field v-model="content" autofocus />
    </van-dialog>
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import editBanner from "@/components/editBanner.vue";
export default {
  components: { NavBar, editBanner },
  data() {
    return {
      model: {},
      show: false,
      textshow: false,
      gendershow: false,
      content: "",
      actions: [
        { name: "女", val: "0" },
        { name: "男", val: "1" }
      ]
    };
  },
  methods: {
    async selectUser() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const fromdata = new FormData();
      fromdata.append("file", file.file);
      const res = await this.$http.post("/upload", fromdata);
      console.log(res);
      this.model.user_img = res.data.url;
      this.UserUpdate();
    },
    async UserUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if (res.data.code == 200) {
        this.$msg.fail("修改成功");
      }
    },
    confirmClick() {
      this.model.name = this.content;
      this.UserUpdate();
      this.content = "";
    },
    textareaClick() {
      this.model.user_desc = this.content;
      this.UserUpdate();
      this.content = "";
    },
    onSelect(data) {
      this.model.gender = data.val;
      this.UserUpdate();
      this.gendershow = false;
    }
  },
  created() {
    this.selectUser();
  }
};
</script>

<style lang="less" scope>
.editViews a {
  color: #333;
}
.editViews img {
  height: 12.778vw;
  width: 12.778vw;
  border-radius: 50%;
}
.uploadfile {
  position: relative;
  overflow: hidden;
  .uploading {
    position: absolute;
    opacity: 0;
  }
}
.editback {
  margin-top: 5.556vw;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  color: #999;
  font-size: 18px;
  padding: 4.167vw;
}
</style>
