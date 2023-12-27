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
            <el-form-item label="任务名" prop="name">
              <el-input v-model="ruleForm.name"
                        placeholder="任务名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="ruleForm.description"
                        placeholder="任务描述" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人数限制" prop="workerNum">
              <el-input v-model="ruleForm.workerNum"
                        placeholder="人数限制" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务限时" prop="timeLimit">
              <el-input v-model="ruleForm.timeLimit"
                        placeholder="任务限时(小时）" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招募截止" prop="recruitEnd">
              <el-date-picker
                  v-model="recruitEnd"
                  type="datetime"
                  placeholder="请选择招募截止时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
<!--            // TODO 单选-->
            <el-form-item label="设备要求" prop="deviceReq">
              <el-select v-model="ruleForm.deviceReq" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="item in deviceoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
<!--            // TODO 多选 labels[] -->
            <el-form-item label="任务类型" prop="labels">
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
          <el-col :span="12">
            <el-form-item label="任务难度" prop="difficultyLevel">
<!--              <el-input v-model="ruleForm.difficultyLevel"-->
<!--                        placeholder="任务难度(1-5)" clearable></el-input>-->
              <el-rate
                  style="background-color: white;display: inline"
                  v-model="ruleForm.difficultyLevel"
                  show-score
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
              </el-rate>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待测文件" prop="exeUrl">
              <div class="file-freestyle">
                <input name="file" type="file" @change="updataexe" class="upload_file"/>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明文档" prop="docUrl">
              <div class="file-freestyle">
                <input name="file" type="file" @change="updatadoc" class="upload_file"/>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">发布任务</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      deviceoptions:[{
        "value":"手机",
        "label":"手机"
      },
        {
          "value":"笔记本电脑",
          "label":"笔记本电脑"
        },
        {
          "value":"台式机",
          "label":"台式机"
        },
        {
          "value":"嵌入式设备",
          "label":"嵌入式设备"
        },
        {
          "value":"其它设备",
          "label":"其它设备"
        }
      ],
      missionoptions:[{
        "value":"差分测试",
        "label":"差分测试"
      },{
        "value":"变异测试",
        "label":"变异测试"
      },{
        "value":"模糊测试",
        "label":"模糊测试"
      }],
      mid: '',
      type: '',
      uid:'',
      recruitStart: '',
      recruitEnd: '',
      exeUrl:'',
      docUrl:'',
      ruleForm: {
        name: '',
        description:'',
        recruitStart:0,
        recruitEnd:0,
        timeLimit:'',
        workerNum:'',
        difficultyLevel:'',
        deviceReq:'',
        labels:[],
        exeUrl:'',
        docUrl:''
      },
      rules: {
        name: [
          {required: true, message: '请输入任务名', trigger: 'blur'},
        ],
        description: [
          {required: true, message: '请输入任务描述', trigger: 'blur'},
        ],
        recruitEnd: [
          {required: true, message: '请选择招募结束时间', trigger: 'blur'},
        ],
        timeLimit:[
          {required: true, message: '请输入任务限时', trigger: 'blur'},
        ],
        workerNum:[
          {required: true, message: '请输入工人数量', trigger: 'blur'},
        ],
        labels:[
          {required: true, message: '请选择任务类型', trigger: 'blur'},
        ],
        difficultyLevel:[
          {required: true, message: '请选择任务难度', trigger: 'blur'},
          { type:'number', min: 1, max: 5, message: '任务难度应该是1~5', trigger: 'blur' },
        ],
        deviceReq:[
          {required: true, message: '请选择设备需求', trigger: 'blur'},
        ],
        // exeUrl:[
        //   {required: true, message: '请上传待测可执行文件', trigger: 'blur'},
        // ],
        // docUrl:[
        //   {required: true, message: '请上传测试文档', trigger: 'blur'},
        // ],
      },
      fileList: [],
      dialogVisible:false,
      base:"",
      files:''
    };
  },
  mounted() {
    //将上一级的界面保存取出来
    this.mid=this.$route.query.mid;
    this.uid=this.$storage.get("uid");
    this.type=this.$route.query.type;
    console.log("mid:");
    console.log(this.mid);
    console.log("uid:");
    console.log(this.uid);
    console.log(this.type);
  },
  computed: {},
  methods: {
    updataexe(event){
      event.preventDefault()
      let file=event.target.files[0] //根据事件源找到上传的file
      let formData = new FormData();
      formData.append('multipartFile',file);//键名要和后台一致
      const instance=axios.create({
        withCredentials: true
      })
      instance.post('/collect/file/upload',formData).then(res=>{
        console.log(res.data.data)
        this.exeUrl = res.data.data
        // this.ruleForm.exeUrl=res.data
        // console.log(this.ruleForm.exeUrl)
      })
      this.$message({
        message: "文件上传成功",
        type: "success",
        duration: 1500,
        onClose: () => {
        }})
    },
    updatadoc(event){
      event.preventDefault()
      let file=event.target.files[0] //根据事件源找到上传的file
      let formData = new FormData();
      formData.append('multipartFile',file);//键名要和后台一致
      const instance=axios.create({
        withCredentials: true
      })
      instance.post('/collect/file/upload',formData).then(res=>{
        console.log(res.data.data)
        this.docUrl = res.data.data
        // this.ruleForm.exeUrl=res.data
        // console.log(this.ruleForm.docUrl)

      })
      this.$message({
        message: "文件上传成功",
        type: "success",
        duration: 1500,
        onClose: () => {
        }})
    },
    parseDate(date){
      console.log("date");
      console.log(date);
      var dt=parseInt(date)
      return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
    },
    onSubmit() {
      console.log(this.ruleForm)
      this.recruitStart=Date.now();
      this.ruleForm.recruitStart=Date.now();
      this.ruleForm.recruitStart=this.recruitStart;
      this.ruleForm.recruitEnd=this.recruitEnd;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: `mission/addmission?uid=${this.uid}&exeUrl=${this.exeUrl}&docUrl=${this.docUrl}`,
            method: "post",
            data: this.ruleForm
          }).then(({data}) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.$router.push({
                  path:'/mission'
                })
              }
            });
          });
        }
      });
    },
    back() {
      this.$router.go(-1)
    },
  },
  // components:{
  //   "file-box":FileUpload
  // }
};
</script>
<style lang="scss" scoped>
.editor {
  height: 500px;
}
.file-freestyle {
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 30px;
  background-image:url("../../../../src/assets/img/upload.png");
  background-size: 100%;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
  cursor:pointer;
}

.upload_file {
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 40px;
  /*透明度为0*/
  opacity: 0;
  cursor: pointer;
}
</style>
