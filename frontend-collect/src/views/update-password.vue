<template>
  <div>
    <img class="bg" src="@/assets/img/background.jpg">
    <el-form

      class="login-form"
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="80px"
      style="margin-top: 100px; background: aliceblue"
    >

      <!--      class="detail-form-content"-->
      <el-form-item label="原密码" prop="oldPassword" style="margin-top: 30px; margin-right: 10px">
        <el-input v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" style="margin-right: 10px">
        <el-input v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" style="margin-right: 10px">
        <el-input v-model="ruleForm.rePassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="
                      margin-left: 28px;
                      margin-bottom: 1.5px"
                   @click="onHandler" >确 定</el-button>
        <el-button  type="warning"
                    style="
                      margin-left: 66px;
                      margin-bottom: 1.5px"
                   @click="backToIndex" >返 回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {},
      user: {},
      rules: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "新密码不能为空",
            trigger: "change"
          }
        ],
        rePassword: [
          {
            required: true,
            message: "确认密码不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    onLogout() {
      this.$storage.remove("Token");
      this.$router.replace({ name: "login" });
    },
    // 修改密码
    onHandler() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.ruleForm.newPassword != this.ruleForm.rePassword) {
            this.$message.error("两次密码输入不一致");
            return;
          }
          console.log(this.ruleForm.oldPassword);
          console.log(this.ruleForm.newPassword);
          var uid=this.$storage.get("uid");
          this.$http({
            url: `/user/updatepassword?uid=${this.$storage.get("uid")}`,
            method: "post",
            data:{
              oldPassword:this.ruleForm.oldPassword,
              newPassword:this.ruleForm.newPassword
            }
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "修改密码成功,下次登录系统生效",
                type: "success",
                duration: 1500,
                onClose: () => {
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    backToIndex(){
      this.$router.replace({path: "/index/"});
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
