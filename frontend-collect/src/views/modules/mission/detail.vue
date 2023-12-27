<template>
  <div>
      <el-form
          class="detail-form-content"
          ref="ruleForm"
          :model="ruleForm"
          label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务名" prop="name">
              <el-input v-model="ruleForm.name"
                        placeholder="任务名" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务描述" prop="description">
              <el-input v-model="ruleForm.description"
                        placeholder="任务描述" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="招募截止" prop="recruitEnd">
              <el-input v-model="ruleForm.recruitEnd" autosize
                        placeholder="招募截止" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务限时" prop="timeLimit">
              <el-input v-model="ruleForm.timeLimit"
                        placeholder="任务限时（小时）" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="招募开始" prop="recruitEnd">
              <!--            只在detail里出现-->
              <el-input v-model="ruleForm.recruitStart" autosize
                        placeholder="招募开始" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人数限制" prop="workerNum">
              <el-input v-model="ruleForm.workerNum"
                        placeholder="人数限制" readonly></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="设备要求" prop="deviceReq">
              <el-tag>{{ruleForm.deviceReq}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务状态" prop="state">
              <!--            只在细节-->
              <el-tag>{{ruleForm.state}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="任务类型" prop="labels">
              <el-tag
                  v-for="item in ruleForm.labels"
                  :key="item"
              >{{ item}}
              </el-tag>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="任务难度" prop="difficultyLevel">
              <el-rate v-model="this.ruleForm.difficultyLevel" disabled show-score text-color="#ff9900"></el-rate>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待测文件">
              <el-button type="primary"  @click="download('exe')">
                下载
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明文档">
              <el-button type="primary"  @click="download('doc')">
                下载
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="viewTestReports()">查看测试报告</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      //是否是mylist跳转过来的
      isMylist:'',
      mid: '',
      uid:'',
      score:'',
      recruitStart: '',
      recruitEnd: '',
      ruleForm: {
        name: '',
        description:'',
        recruitStart:0,
        recruitEnd:0,
        timeLimit:'',
        workerNum:'',
        labels:[],
        difficultyLevel:'',
        deviceReq:'',
        exeUrl:'',
        docUrl:''
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
    this.isMylist=this.$route.query.isMylist
    console.log("mid:");
    console.log(this.mid);
    console.log("uid:");
    console.log(this.uid);
    this.init();
  },
  computed: {},
  methods: {
    download(url){
      if(url === 'exe'){
        console.log(this.ruleForm.exeUrl);
        window.open(this.ruleForm.exeUrl);
      }else{
        console.log(this.ruleForm.docUrl);
        window.open(this.ruleForm.docUrl);
      }
    },
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
    // 初始化
    init() {
      this.$http({
        url: `mission/searchmissionbymid?mid=${this.mid}`,
        method: "get"
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data);
          this.ruleForm = data.mission;
          // console.log(this.ruleForm)
          // //这里还要解析一下Date的字符串。
          this.ruleForm.recruitStart=new Date(this.ruleForm.recruitStart)
          this.ruleForm.recruitEnd=new Date(this.ruleForm.recruitEnd)
          console.log(this.ruleForm)
        }
        else {
          this.$message.error(data.msg);
        }


      });
    },
    parseDate(date){
      console.log("date");
      console.log(date);
      var dt=parseInt(date)
      return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
    },
    viewTestReports() {
      this.$router.push({
        path:'/report',
        query:{
          //当前登录用户的uid，协作之用
          // uid:this.uid,
          mid:this.mid
        }
      })
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
