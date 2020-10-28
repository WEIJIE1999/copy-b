<template>
  <div class="home" v-if="category">
    <nav-bar></nav-bar>
    <div class="categorytab">
      <div class="category-ico" @click="$router.push('/editcategory')">
        <van-icon name="setting-o" />
      </div>
      <van-tabs v-model="active" swipeable sticky animated>
        <van-tab
          v-for="(item, index) in category"
          :key="index"
          :title="item.title"
        >
          <van-list
            v-model="item.loading"
            :immediate-check="false"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div class="detailparent">
              <detail
                class="detailitem"
                :detailitem="categoryitem"
                v-for="(categoryitem, categoryindex) in item.list"
                :key="categoryindex"
              />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Detail from "@/components/Detail.vue";
export default {
  data() {
    return {
      category: [],
      active: 0
    };
  },
  components: { NavBar, Detail },
  methods: {
    async selectCategory() {
      if (localStorage.getItem("newCat")) {
        let newCat = JSON.parse(localStorage.getItem("newCat"));
        this.changeCategory(newCat);
      } else {
        const res = await this.$http.get("/category");
        this.changeCategory(res.data);
      }
    },
    changeCategory(data) {
      const category1 = data.map(item => {
        item.page = 0;
        item.pagesize = 10;
        item.finished = false;
        item.loading = false;
        item.list = [];
        return item;
      });
      this.category = category1;
      this.selectArticle();
    },
    async selectArticle() {
      const categoryitem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryitem._id, {
        params: {
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      });
      categoryitem.list.push(...res.data);
      categoryitem.loading = false;
      if (res.data.length < categoryitem.pagesize) {
        categoryitem.finished = true;
      }
    },
    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },
    onLoad() {
      const categoryitem = this.categoryItem();
      setTimeout(() => {
        categoryitem.page += 1;
        this.selectArticle();
      }, 1000);
    }
  },
  watch: {
    active() {
      this.selectArticle();
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>
<style lang="less" scoped>
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
.categorytab {
  position: relative;
  .category-ico {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.944vw;
    padding: 1.389vw 2.778vw;
    background-color: white;
  }
}
</style>
