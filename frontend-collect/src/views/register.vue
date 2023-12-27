<template>
  <el-container>
    <img class="bg" src="@/assets/img/backgroundRegister.jpg">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login-form" label-position="top">
      <h1 class="h1" v-if="userType=='employer'">企业用户注册</h1>
      <h1 class="h1" v-if="userType=='employee'">个人用户注册</h1>
      <el-form-item  label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item  label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item  label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item  label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item v-if="userType=='employer'" label="企业名称" prop="companyName">
        <el-input v-model="ruleForm.companyName" placeholder="企业名称"></el-input>
      </el-form-item>
<!--      <el-form-item v-if="userType=='employee'" label="测试设备" prop="devices">-->
<!--        <el-checkbox-group v-model="ruleForm.devices">-->
<!--          <el-checkbox label="嵌入式设备" name="type" />-->
<!--          <el-checkbox label="笔记本电脑" name="type" />-->
<!--          <el-checkbox label="台式机" name="type" />-->
<!--          <el-checkbox label="手机" name="type" />-->
<!--          <el-checkbox label="其他设备" name="type" />-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item v-if="userType=='employee'" label="任务偏好" prop="labels">-->
<!--        <el-checkbox-group v-model="ruleForm.labels">-->
<!--          <el-checkbox label="蜕变测试" name="type" />-->
<!--          <el-checkbox label="差分测试" name="type" />-->
<!--          <el-checkbox label="模糊测试" name="type" />-->
<!--          <el-checkbox label="压力测试" name="type" />-->
<!--          <el-checkbox label="单元测试" name="type" />-->
<!--          <el-checkbox label="黑盒测试" name="type" />-->
<!--          <el-checkbox label="白盒测试" name="type" />-->
<!--          <el-checkbox label="灰盒测试" name="type" />-->
<!--          <el-checkbox label="变异测试" name="type" />-->
<!--          <el-checkbox label="功能测试" name="type" />-->
<!--          <el-checkbox label="非功能测试" name="type" />-->
<!--          <el-checkbox label="集成测试" name="type" />-->
<!--          <el-checkbox label="其他测试" name="type" />-->
<!--          <el-checkbox label="动态测试" name="type" />-->
<!--          <el-checkbox label="静态测试" name="type" />-->
<!--          <el-checkbox label="接口测试" name="type" />-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      // TODO 测试设备多选： 嵌入式设备 devices-->
      <!--      // TODO 测试（任务）类型多选： labels-->
<!--      <el-button @click="login()" class="btn-login" type="primary">注册</el-button>-->
<!--      <el-button type="text" @click=back()>返回</el-button>-->
      <el-form-item>
        <el-button type="primary"
                   style="
                      margin-left: 88px;
                      margin-bottom: 1.5px"
                   @click="login" >注 册</el-button>
        <el-button  type="warning"
                    style="
                      margin-left: 78px;
                      margin-bottom: 1.5px"
                    @click="back" >返 回</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import {isEmail, isMobile} from "@/utils/validate";
export default {
  data() {
    return {
      ruleForm: {
        nickname:'',
        username:'',
        password:'',
        phoneNumber:'',
        email:'',
        companyName:'',
        // devices:[],
        // labels:[]
      },
      userType:"",
      rules: {
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
        ],
        username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        phoneNumber:[
        {required: true, message: '请输入电话号码', trigger: 'blur'},
          { pattern:/^1[3456789]\d{9}$/, message: "请输入合法手机号", trigger: "blur" }
        ],
        email:[
        {required: true, message: '请输入邮箱', trigger: 'blur'},
          { pattern:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: "请输入正确的邮箱", trigger: "blur"}
        ],
        companyName:[
        {required: true, message: '请输入企业名', trigger: 'blur'},
        ],
        devices:[
        {required: true, message: '请选择设备', trigger: 'blur'},
        ],
        labels:[
        {required: true, message: '请选择任务偏好', trigger: 'blur'},
        ],

    },
    };
  },
  mounted(){
    let userType = this.$storage.get("userType");
    this.userType = userType;
  },
  methods: {
    back(){
      this.$router.replace({ path: "/login" });
      return
    },
    // 注册
    login() {
      console.log(this.ruleForm)
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
            this.$http({
              url: `/user/register?userType=${this.userType}`,
              method: "post",
              data:this.ruleForm
            }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.$router.replace({path: "/login"});
                }
              });
            } else {
              this.$message.error(data.msg);
            }
         });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
