<template>
  <div @click="bannerClick" class="editBanner">
    <span>{{ left }}</span>
    <span><slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
  props: ["left"],
  methods: {
    bannerClick() {
      this.$emit("bannerClick");
    }
  }
};
</script>

<style lang="less" scope>
.editBanner {
  background-color: white;
  padding: 15px;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
}
</style>
