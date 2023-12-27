<template>
    <div>
        <el-form
                class="detail-form-content"
                ref="ruleForm"
                :model="ruleForm"
                label-width="80px"
        >
            <el-col :span="12">
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="ruleForm.nickname"
                              placeholder="昵称" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号" prop="phoneNumber">
                    <el-input v-model="ruleForm.phoneNumber"
                              placeholder="手机号" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email"
                              placeholder="邮箱" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item v-if="userType=='employer'" label="企业名称" prop="companyName">
                    <el-input v-model="ruleForm.companyName"
                              placeholder="企业名称" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col>
              <el-form-item v-if="userType=='employee'" label="测试设备" prop="devices">
                <el-checkbox-group v-model="ruleForm.devices">
                  <el-checkbox label="嵌入式设备" name="type" />
                  <el-checkbox label="笔记本电脑" name="type" />
                  <el-checkbox label="台式机" name="type" />
                  <el-checkbox label="手机" name="type" />
                  <el-checkbox label="其他设备" name="type" />
                </el-checkbox-group>
              </el-form-item>
              <el-form-item v-if="userType=='employee'" label="任务偏好" prop="labels">
                <el-checkbox-group v-model="ruleForm.labels">
                  <el-checkbox label="蜕变测试" name="type" />
                  <el-checkbox label="差分测试" name="type" />
                  <el-checkbox label="模糊测试" name="type" />
                  <el-checkbox label="压力测试" name="type" />
                  <el-checkbox label="单元测试" name="type" />
                  <el-checkbox label="黑盒测试" name="type" />
                  <el-checkbox label="白盒测试" name="type" />
                  <el-checkbox label="灰盒测试" name="type" />
                  <el-checkbox label="变异测试" name="type" />
                  <el-checkbox label="功能测试" name="type" />
                  <el-checkbox label="非功能测试" name="type" />
                  <el-checkbox label="集成测试" name="type" />
                  <el-checkbox label="其他测试" name="type" />
                  <el-checkbox label="动态测试" name="type" />
                  <el-checkbox label="静态测试" name="type" />
                  <el-checkbox label="接口测试" name="type" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="onHandler">修 改</el-button>
            </el-form-item>
          </el-col>
        </el-form>
    </div>
</template>
<script>
    // 各种校验方法
    import {isEmail, isMobile} from "@/utils/validate";

    export default {
        data() {
            return {
                ruleForm: {
                  nickname:"",
                  phoneNumber:"",
                  email:"",
                  companyName:"",
                  devices:[],
                  labels:[]
                },
                userType:""
            };
        },
        mounted() {
            var userType = this.$storage.get("userType");
            this.userType = userType;
        },
        methods: {
            onHandler() {
                if (!this.ruleForm.nickname) {
                    this.$message.error('昵称不能为空');
                    return
                }
                if ((!this.ruleForm.phoneNumber) || (!isMobile(this.ruleForm.phoneNumber))) {
                    this.$message.error(`手机号格式不正确`);
                    return
                }
                if ((!this.ruleForm.email) || (!isEmail(this.ruleForm.email))) {
                    this.$message.error(`邮箱格式不正确`);
                    return
                }
                if ((this.userType=="employer")&&!this.ruleForm.companyName){
                  this.$message.error(`企业名称不能为空`)
                  return;
                }
                if (this.ruleForm.labels.length===0) {
                  this.$message.error('请选择任务偏好！');
                  return
                }
                if (this.ruleForm.devices.length===0) {
                  this.$message.error('请选择测试设备！');
                  return
                }
                console.log(this.ruleForm);
                this.$http({
                    url: `/user/updateuser?uid=${this.$storage.get("uid")}`,
                    method: "post",
                    data: this.ruleForm
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: "修改信息成功",
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
        }
    };
</script>
<style lang="scss" scoped>
</style>
