<template>
  <el-main>
    <router-view class="router-view"></router-view>
  </el-main>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.el-main {
  background-color: #FFFFFF;
  padding: 0;
  margin-top: 80px;
}
.router-view {
  padding: 10px;
  margin-top: 55px;
}
.bread-crumbs {
  position: absolute;
  right: 0;
  left: 200px;
  z-index: 99;
  border-bottom: 1px solid #e9eef3;
  border-top: 1px solid #e9eef3;
}
</style>
