<template>
  <div>
    <img class="bg" style="z-index: 0" src="@/assets/img/backgroundEmail.jpg">
    <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="100px"
        label-position="left"
        style=" position: absolute;
                margin-top: 4em;
                top: 10%;
                right: 25%;
                width: 50%;
                padding: 20px;
                // height: 50%;
                font-size: 18px;
                font-weight: bold;
                background: #f7f7f7"
      >
      <el-form-item style="margin-top: 1.2em" label="邮件主题：" prop="emailTheme">
        <el-input style="width: 40em;" v-model="ruleForm.emailTheme"></el-input>
      </el-form-item>
      <el-form-item label="邮件内容：" prop="emailContent">
        <el-input
            type="textarea"
            :rows="10"
            style="width: 40em"
            v-model="ruleForm.emailContent">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="
                      margin-left: 7.7em;
                      margin-bottom: 1.5px"
                   @click="onHandler" >发 送</el-button>
        <el-button  type="warning"
                    style="
                      margin-left: 8em;
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
        emailTheme: "",
        emailContent: "",
      }
    };
  },
  mounted() {},
  methods: {
    backToIndex() {
      this.$router.replace({name:"home"})
    },
    // 向后端传输邮件内容
    onHandler() {
      //显示发送成功信息
      if (!this.ruleForm.emailTheme) {
        this.$message({
                showClose:true,
                message: '请输入邮件主题',
                type:'error',
                duration: 1500,
                center:true,
            }
        );
        return
      }
      if (!this.ruleForm.emailContent) {
        this.$message({
              showClose:true,
              message: '请输入邮件内容',
              type:'error',
              duration: 1500,
              center:true,
            }
        );
        return
      }

      this.$message({
        showClose:true,
        message:'发送成功，2秒后返回主页',
        type:'success',
        duration: 2000,
        center:true,
      });

      //两秒后返回主页面
      var timer = setTimeout(()=>{
        this.$router.replace({ name: "home" });
      },2000);

      // this.$refs["ruleForm"].validate(valid => {
      //   if (valid) {
      //     if (this.ruleForm.newPassword != this.ruleForm.rePassword) {
      //       this.$message.error("两次密码输入不一致");
      //       return;
      //     }
      //     console.log(this.ruleForm.oldPassword);
      //     console.log(this.ruleForm.newPassword);
      //     var uid=this.$storage.get("uid");
      //     this.$http({
      //       url: `/user/updatepassword?uid=${this.$storage.get("uid")}`,
      //       method: "post",
      //       data:{
      //         oldPassword:this.ruleForm.oldPassword,
      //         newPassword:this.ruleForm.newPassword
      //       }
      //     }).then(({ data }) => {
      //       if (data && data.code === 0) {
      //         this.$message({
      //           message: "修改密码成功,下次登录系统生效",
      //           type: "success",
      //           duration: 1500,
      //           onClose: () => {
      //           }
      //         });
      //       } else {
      //         this.$message.error(data.msg);
      //       }
      //     });
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
