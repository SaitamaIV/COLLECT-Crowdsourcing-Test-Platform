<template>
  <div style="background-color: white">
    <el-form
        class="detail-form-content"
        ref="ruleForm"
        :model="ruleForm"
        label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="报告主题" prop="title">
            <el-input readonly
                      v-model="ruleForm.title"
                      :autosize="{ minRows: 1, maxRows: 50 }"
                      type="textarea"
                      placeholder="报告主题"
                      style="width: 70%;margin-left: 2em"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="漏洞描述" prop="bugDescription">
              <el-input readonly
                  v-model="ruleForm.bugDescription"
                  :autosize="{ minRows: 2, maxRows: 50 }"
                  type="textarea"
                  placeholder="漏洞描述信息"
                  style="width: 70%;margin-left: 2em"
              >
              </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="复现步骤" prop="bugRecurrentSteps">
              <el-input readonly
                  v-model="ruleForm.bugRecurrentSteps"
                  :autosize="{ minRows: 2, maxRows: 50 }"
                  type="textarea"
                  placeholder="漏洞复现步骤"
                  style="width: 70%;margin-left: 2em"
              >
              </el-input>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="设备信息" prop="deviceInformation">
              <el-input readonly
                  v-model="ruleForm.deviceInformation"
                  :autosize="{ minRows: 2, maxRows: 50 }"
                  type="textarea"
                  placeholder="设备详细信息"
                  style="width: 70%;margin-left: 2em"
              >
              </el-input>
            </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="测试截图"></el-form-item>
        </el-col>
        <el-col>
          <template v-if="imgUrlList.length>0">
            <div class="demo-image__preview">
              <el-image v-if="imgUrlList.length>0"
                        style="width: 21em; height: 18em"
                        :src="imgUrlList[0]"
                        :preview-src-list="imgUrlList"
                        :initial-index="8"
                        fit="cover"
              />
              <el-image v-if="imgUrlList.length>1"
                        style="width: 21em; height: 18em"
                        :src="imgUrlList[1]"
                        :preview-src-list="imgUrlList"
                        :initial-index="88"
                        fit="cover"
              />
              <el-image v-if="imgUrlList.length>2"
                        style="width: 21em; height: 18em"
                        :src="imgUrlList[2]"
                        :preview-src-list="imgUrlList"
                        :initial-index="4"
                        fit="cover"
              />
              <el-image v-if="imgUrlList.length>3"
                        style="width:21em; height: 18em"
                        :src="imgUrlList[3]"
                        :preview-src-list="imgUrlList"
                        :initial-index="8"
                        fit="cover"
              />
            </div>
          </template>
        </el-col >
        <el-col v-if="this.rid==null" :span="24" style="margin-top: 3em">
          <el-form-item label="报告评分" prop="score">
            <el-rate v-if="this.ruleForm.score>0" style="margin-top: 0.7em" v-model="this.ruleForm.score" disabled show-score text-color="#ff9900" score-template="{value} points"></el-rate>
            <el-tag v-else>暂无评分</el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-top: 2em">
        <el-button v-if="!this.rid && !this.similarFid" type="primary" @click="togetherView()">查看协作报告</el-button>
        <el-button v-if="!this.rid && !this.similarFid" type="primary" @click="similarView()">查看相似报告</el-button>
        <el-button v-if="this.similarFid" type="primary" @click="together()">协作</el-button>
      </el-form-item>
    </el-form>
    <span> </span>
    <el-divider />
    <span> </span>


    <comment v-if="this.rid==null" :key="commentKey" @doSend="doSend(arguments)" :commentList="commentList" :commentNum="commentNum" :label="label" :avatar="avatar" :placeholder="placeholder" :minRows="minRows" :maxRows="maxRows"></comment>



  </div>
</template>
<script>
// 一些基本格式的校验校验
import axios from "axios";
import Comment from '@/components/common/Comment';
export default {
  data() {
    return {
      commentKey:0,
      label:"SVIP",
      placeholder:"说点什么吧",
      minRows:4,
      maxRows:4,
      commentNum:2,
      avatar:require('@/components/common/img/icon/avtar.png'),
      commentList:[
      ],
      form: {},
      similarFid:'',
      fid: '',
      imgUrlList: [],
      fileList: [],
      dialogVisible:false,
      base:'',
      files:'',
      uid: '',
      mid: '',
      ruleForm: {
        title:'',
        bugDescription: '',
        bugRecurrentSteps:'',
        deviceInformation:'',
        score:''
      },
    };
  },
  mounted() {
    //将上一级的界面保存取出来
    this.fid=this.$route.query.fid
    this.mid=this.$route.query.mid
    this.rid=this.$route.query.rid
    console.log("uid:");
    console.log(this.uid);
    console.log("mid:");
    console.log(this.mid);
    console.log(this.fid)
    if(this.rid){
      this.initTogetherReport();
    }
    else{
      this.initMainReport();
    }
  },
  computed: {},
  methods: {
    together(){
      this.$router.push({
        path:'/report/edit',
        query:{
          fid:this.similarFid,
        }
      })
    },
    togetherView(){
      this.$router.push({
        path:'/report/together',
        query:{
          fid:this.fid,
          mid:this.mid,
        }
      })
    },
    similarView(){
      this.$router.push({
        path:'/report/similar',
        query:{
          fid:this.fid,
          mid:this.mid,
        }
      })
    },
    // 初始化
    initMainReport() {
        this.$http({
          url: `fetchmission/searchreportbyfid?fid=${this.fid}`,
          method: "get"
        }).then(({data}) => {
          if (data && data.code === 0) {
            if(data.fetchmission.picture1!=null)
              this.imgUrlList.push(data.fetchmission.picture1)
            if(data.fetchmission.picture2!=null)
              this.imgUrlList.push(data.fetchmission.picture2)
            if(data.fetchmission.picture3!=null)
              this.imgUrlList.push(data.fetchmission.picture3)
            if(data.fetchmission.picture4!=null)
              this.imgUrlList.push(data.fetchmission.picture4)
            console.log(this.imgUrlList)
            this.ruleForm = data.fetchmission;
            console.log(this.ruleForm.score);
            if(this.ruleForm.score>0){
              this.ruleForm.score=this.ruleForm.score.toString().substr(0,3)
            }
            this.getComments()
          }
          else {
            this.$message.error(data.msg);
          }
        });
    },
    initTogetherReport(){
      this.$http({
        url: `report/getreport?rid=${this.rid}`,
        method: "get"
      }).then(({data}) => {
        if(data.data.picture1!=null)
          this.imgUrlList.push(data.data.picture1)
        if(data.data.picture2!=null)
          this.imgUrlList.push(data.data.picture2)
        if(data.data.picture3!=null)
          this.imgUrlList.push(data.data.picture3)
        if(data.data.picture4!=null)
          this.imgUrlList.push(data.data.picture4)
        console.log(this.imgUrlList)
        this.ruleForm = data.data;
        console.log(this.ruleForm);
      });
      this.getComments()
    },
    getComments(){
      this.$http({
        url: `comment/getcommentlist?fid=${this.fid}`,
        method: "get",
      }).then(({data}) => {
        this.commentList=data.data
        for(let i=0;i<this.commentList.length;i++){
          this.commentList[i].submitTime=new Date(this.commentList[i].submitTime)
          this.commentList[i].id=i+1
        }
        function compare(property) {
          return function (a,b){
            let time1=a[property]
            let time2=b[property]
            return time2-time1
          }
        }
        this.commentList.sort(compare('submitTime'))
        console.log(this.commentList)
        this.commentNum=this.commentList.length
      });
    },
    //发布评论
    doSend(args){
      let body={
        "submitTime": Date.now(),
        "content": args[0],
        "score": args[1],
      }
      console.log(args[0])
      console.log(body)
      console.log(args[1])
      this.$http({
        url: `comment/submitcomment?fid=${this.fid}&uid=${localStorage.getItem("uid")}`,
        method: "post",
        data: body
      }).then(({data}) => {
        if(data && data.code === 0){
          this.$message({
            message: "发布成功",
            type: "success",
            duration: 1500,
            })
          this.commentNum+=1
          this.getComments()
        }
        else{
          this.$message.error(data.msg);
        }
      });
    },
  },
  components:{
    Comment
  }
};
</script>
<style lang="scss" scoped>
</style>
