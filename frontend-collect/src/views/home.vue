<template>
  <div>

    <img class="bg" style="z-index: 0" src="@/assets/img/backgroundHome.jpg">
    <img style="z-index: 1;
                position: absolute;
                top: 0;
                left: 0;
                margin-top: 13em;
                margin-left: 27em;
                height: 50%;
                width: 38%;"
         src="@/assets/img/worldwide.png">
    <el-container>
<!--      <img class="home-logo" style="z-index: 20" src="../assets/img/worldwide.png">-->
      <el-button type="primary" style="z-index: 21" circle @click="getStart">点 我 开 始</el-button>
    </el-container>
  </div>
</template>
<script>
export default {
  mounted(){},
  methods:{
    getStart(){
      this.$router.replace({name:"login"})
    }
  }
};
</script>

<style lang="scss" scoped>
  .home-logo{
    height: 12em;
    width: 20em;
    margin-left: 32em;
    margin-top: 12em;
  }
  .el-container{
    background: white;
  }
  .text {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  .el-button{
    height: 13.8em;
    width: 13.8em;
    margin-top: 13em;
    margin-left: 43em;
    color: black;
    border-width: 16px;
    border-color: #fffda0;
    background: white;
  }
</style>
