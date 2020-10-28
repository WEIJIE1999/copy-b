/<template>
  <div v-if="model">
    <NavBar></NavBar>
    <div class="detailinfo">
      <div class="video">
        <video controls :src="model.content"></video>
        <div class="detailinfoText">
          <div>
            <span>{{ model.category.title }}</span>
            <span>{{ model.name }}</span>
          </div>
          <div>
            <span>{{ model.userinfo.name }}</span>
            <span>164.4万次观看</span>
            <span>5281弹幕</span>
            <span>{{ model.date }}</span>
          </div>
          <div>
            <p
              @click="collectionClick"
              :class="{ activeColor: collectionActive }"
            >
              <span class="icon-star-full"></span>
              <span>收藏</span>
            </p>
            <p
              @click="subscriptClick"
              :class="{ activeColor: subscritionActive }"
            >
              <span class="icon-bubble"></span>
              <span>关注</span>
            </p>
            <p>
              <span class="icon-redo2"></span>
              <span>分享</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="detailparent">
      <Detail
        class="detailitem"
        v-for="(item, index) in commenList"
        :key="index"
        :detailitem="item"
      ></Detail>
    </div>
    <Article
      :dataLength="lens"
      @Postcomment="postSuccess"
      ref="commentIpt"
    ></Article>
    <Comment
      @lengthselect="len => (lens = len)"
      @publishClick="PostChildClick"
      ref="commentPulish"
    ></Comment>
  </div>
</template>

<script>
import Article from "@/components/article.vue";
import Comment from "@/components/comment.vue";
import NavBar from "@/components/NavBar.vue";
import Detail from "@/components/Detail.vue";
export default {
  data() {
    return {
      model: null,
      commenList: null,
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      collectionActive: null,
      subscritionActive: null
    };
  },
  components: { NavBar, Detail, Article, Comment },
  methods: {
    async articleitemDate() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      if (this.model) {
        this.subscritionInit();
      }
    },
    async commendData() {
      const res = await this.$http.get("/commend");
      this.commenList = res.data;
    },
    async postSuccess(res) {
      const date = new Date();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      let str = `${m}-${d}`;
      this.Postcom.comment_content = res;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      const result = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPulish.CommentDate();
      console.log(result);

      if (result.status == 200) {
        this.$msg.fail("发布成功");
      }
    },
    PostChildClick(id) {
      this.Postcom.parent_id = id;
      this.$refs.commentIpt.focusIpt();
    },
    // 收藏
    async collectionClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/collection/" + localStorage.getItem("id"),
          { article_id: this.$route.params.id }
        );
        if (res.data.msg == "收藏成功") {
          this.collectionActive = true;
        } else {
          this.collectionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    // 关注
    async subscriptClick() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.post(
          "/sub_scription/" + localStorage.getItem("id"),
          { sub_id: this.model.userid }
        );
        if (res.data.msg == "关注成功") {
          this.subscritionActive = true;
        } else {
          this.subscritionActive = false;
        }
        this.$msg.fail(res.data.msg);
      }
    },
    // 是否关注
    async subscritionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/sub_scription/" + localStorage.getItem("id"),
          {
            params: { sub_id: this.model.userid }
          }
        );
        this.subscritionActivte = res.data.success;
      }
    },
    //进入页面获取是否收藏
    async collectionInit() {
      if (localStorage.getItem("token")) {
        const res = await this.$http.get(
          "/collection/" + localStorage.getItem("id"),
          {
            params: {
              article_id: this.$route.params.id
            }
          }
        );
        this.collectionActive = res.data.success;
      }
    }
  },
  created() {
    this.articleitemDate();
    this.commendData();
    this.collectionInit();
  },
  watch: {
    $router() {
      this.articleitemDate();
      this.commendData();
    }
  }
};
</script>

<style lang="less" scoded>
.detailinfo {
  background-color: white;
  .video {
    width: 100%;
    video {
      width: 100%;
    }
  }
}
.detailinfoText {
  padding: 4.167vw;
  div:nth-child(1) {
    span:nth-child(1) {
      padding: 0 2.778vw;
      color: #fb7299;
      background-color: #f4f4f4;
    }
  }
  div:nth-child(2) {
    padding: 3.778vw 2.778vw;
    span {
      color: #aaa;
      font-size: 3.333vw;
      padding-right: 1.5vw;
    }
    span:nth-child(1) {
      padding-right: 2.778vw;
      color: black;
      font-size: 4vw;
    }
  }
  div:nth-child(3) {
    padding: 0 2.778vw;
    display: flex;
    p {
      display: flex;
      margin-right: 4.167vw;
      align-items: center;
      color: #757575;
      span:nth-child(1) {
        font-size: 5.833vw;
        padding-right: 0.833vw;
      }
      span:nth-child(2) {
        font-size: 3.611vw;
      }
    }
    .activeColor {
      color: #fb7299;
    }
  }
}
.home {
  background-color: white;
}
.detailparent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .detailitem {
    margin: 1.389vw 0;
    width: 45%;
  }
}
</style>
