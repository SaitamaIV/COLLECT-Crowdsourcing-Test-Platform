<template>
  <div>
    <el-form
        class="detail-form-content"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px">

      <el-row>
        <el-col :span="12">
          <el-form-item v-if="type=='edit'" label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"
                      placeholder="昵称" clearable></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="type=='detail'" label="昵称" prop="nickname">
              <el-input v-model="ruleForm.nickname"
                        placeholder="昵称" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="type=='edit'" label="用户名" prop="username">
            <el-input v-model="ruleForm.username"
                      placeholder="用户名" clearable></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="type=='detail'" label="用户名" prop="username">
              <el-input v-model="ruleForm.username"
                        placeholder="用户名" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="type=='edit'" label="手机号" prop="phoneNumber">
            <el-input v-model="ruleForm.phoneNumber"
                      placeholder="手机号" clearable></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="type=='detail'" label="手机号" prop="phoneNumber">
              <el-input v-model="ruleForm.phoneNumber"
                        placeholder="手机号" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="type=='edit'" label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"
                      placeholder="邮箱" clearable></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="type=='detail'" label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"
                        placeholder="邮箱" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="type=='edit'&&ruleForm.companyName" label="企业名称" prop="companyName">
            <el-input v-model="ruleForm.companyName"
                      placeholder="企业名称" clearable></el-input>
          </el-form-item>
          <div v-else>
            <el-form-item v-if="type=='detail'&&ruleForm.companyName" label="企业名称" prop="companyName">
              <el-input v-model="ruleForm.companyName"
                        placeholder="企业名称" readonly></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button v-if="type=='edit'" type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 一些基本格式的校验校验
import {isEmail, isMobile} from "@/utils/validate";

export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isMobile(value)) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!isEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    };
    return {
      id: '',
      type: '',
      ruleForm: {
        nickname: '',
        username:'',
        phoneNumber: '',
        email: '',
        companyName: ''
      },
      rules: {
        nickname: [
          {required: true, message: '昵称不能为空', trigger: 'blur'},
        ],
        phoneNumber: [
          {validator: validatePhone, trigger: 'blur'},
        ],
        email: [],
      }
    };
  },
  mounted() {
    //将上一级的界面保存取出来
    this.id=this.$route.query.id;
    this.type=this.$route.query.type;
    this.init();
  },
  computed: {},
  methods: {
    // 下载
    download(file) {
      window.open(`${file}`)
    },
    // 初始化
    init() {
      this.$http({
        url: `user/searchuserbyuid?uid=${this.id}`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.ruleForm = data.user;
        }
        else {
          this.$message.error(data.msg);
        }
      });
    },
    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `user/updateuser?id=${this.id}`,
            method: "post",
            data: this.ruleForm
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                this.$router.push({
                  path:'/user'
                })
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取uuid
    getUUID() {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.$router.push({
        path:'/user'
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.editor {
  height: 500px;
}
</style>
