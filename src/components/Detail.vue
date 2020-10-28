<template>
  <div class="detailitem" @click="pathPush">
    <div class="imgparent">
      <img :src="imge" alt="" style="width:100%" />
      <span class="video icon-play2">123</span>
      <span class="comment icon-file-text">66</span>
    </div>
    <p>{{ detailitem.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imge: "https://images.weserv.nl/?url=" + this.detailitem.img
    };
  },
  props: ["detailitem"],
  methods: {
    pathPush() {
      if (this.$route.path != `/article/${this.detailitem.id}`) {
        this.$router.push(`/article/${this.detailitem.id}`);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detailitem {
  p {
    font-size: 3.333vw;
  }
}
.imgparent {
  position: relative;
  img {
    height: 28.861vw;
  }
  .video {
    position: absolute;
    left: 5px;
    bottom: 0;
    color: white;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
  }
  .comment {
    position: absolute;
    right: 5px;
    bottom: 0;
    color: white;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
  }
}
</style>
