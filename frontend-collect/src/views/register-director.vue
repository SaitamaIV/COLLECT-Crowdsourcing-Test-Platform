<template>
      <el-container>
        <el-header class="btn-register-director-top">请选择用户类型</el-header>
        <el-container>
          <el-main>
            <el-button class="btn-register-director-sender" @click="register('employee')">
            </el-button>
            <el-button class="btn-register-director-receiver" @click="register('employer')" ></el-button>
          </el-main>
        </el-container>
        <el-container>
          <el-footer>
            <span class="txt-register-director" readonly >个人用户</span>
            <span class="txt-register-director" readonly >企业用户</span>
          </el-footer>
        </el-container>
      </el-container>
</template>

<script>
export default {
  name: "register-director",
  methods:{
    register(userType) {
      this.$storage.set("userType", userType);
      this.$router.push({path: '/register'})
    }
  }
}

</script>

<style scoped>
.btn-register-director-sender{
  width: 35em;
  height: 25em;
  margin-left: 9.5em;
  font-weight: bold;
  color: #f96332;
  background-image: url("../assets/img/company.jpg");
  background-size: 100%;
  border-width:1em;
}
.btn-register-director-receiver{
  width: 35em;
  height: 25em;
  margin-left: 6em;
  font-weight: bold;
  color: #f96332;
  background-image: url("../assets/img/worker.jpg");
  background-size: 100%;
  border-width: 1em;
}

.btn-register-director-top{
  margin:0 auto;
  margin-top: 0.3em;
  margin-bottom: 0.5em;
  font-size: 40px;
  font-weight: bold;
  color: #f96332;
}
.txt-register-director {
  margin-left: 16em;
  margin-right: 10.5em;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  border: none;
}

</style>