<template>
  <div>
    <el-form
        class="detail-form-content"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item  label="推荐算法" prop="recommend">
        <el-radio-group v-model="ruleForm.recommend" >
          <el-radio-button label="doc_based" />
          <el-radio-button label="user_based" />
          <el-radio-button label="mission_based" />
        </el-radio-group>
      </el-form-item>
      <el-form-item  label="相似度算法" prop="similarity">
        <el-radio-group v-model="ruleForm.similarity">
          <el-radio-button label="basic_similarity" />
        </el-radio-group>
      </el-form-item>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修 改</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import {isEmail, isMobile} from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {
        recommend: '',
        similarity: ''
      },
      rules: {
        recommend: [
          {required: true, message: '请选择推荐算法', trigger: 'blur'},
        ],
        similarity: [
          {required: true, message: '请选择相似度算法', trigger: 'blur'},
        ],
      },
    };

  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      this.$http({
        url: `/algorithm/getstrategy`,
        method: "get",
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.ruleForm=data.strategy
          console.log(this.ruleForm)
        }
        else {
          this.$message.error(data.msg);
        }

      });
    },
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `/algorithm/changestrategy`,
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
      })
    },
  },
}

</script>

<style scoped>

</style>