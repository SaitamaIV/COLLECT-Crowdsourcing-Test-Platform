<template>
  <div>
    <el-dialog
        title="请将bug用方框标出"
        width="70%"
        :visible.sync="visible"
        :show-close="false"
    >
      <my-cropper ref="cropperChild" @getData="getData(arguments)"></my-cropper>
    </el-dialog>
    <el-form
        class="detail-form-content"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px">

      <el-row>
        <el-col :span="24">
          <el-form-item label="报告主题" prop="title">
            <el-input
                v-model="ruleForm.title"
                :autosize="{ minRows: 1, maxRows: 15 }"
                type="textarea"
                placeholder="报告主题"
                style="width: 70%;margin-left: 2em"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="漏洞描述" prop="bugDescription">
            <el-input
                v-model="ruleForm.bugDescription"
                :autosize="{ minRows: 2, maxRows: 15 }"
                type="textarea"
                placeholder="漏洞描述信息"
                style="width: 70%;margin-left: 2em"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="复现步骤" prop="bugRecurrentSteps">
            <el-input
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
            <el-input
                v-model="ruleForm.deviceInformation"
                :autosize="{ minRows: 2, maxRows: 50 }"
                type="textarea"
                placeholder="设备详细信息"
                style="width: 70%;margin-left: 2em"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="30">
          <el-form-item label="测试图">
            <div class="file-freestyle">
              <input name="file" type="file" @change="updata" class="upload_file"/>
            </div>
          </el-form-item>
          <!--          <file-box></file-box>-->
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
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 一些基本格式的校验校验
import {isEmail, isMobile} from "@/utils/validate";
import axios from "axios";
import {Loading} from 'element-ui'
import MyCropper from '@/components/common/MyCropper';
export default {
  data() {
    return {
      coordinates:[],
      fullscreenLoading:false,
      type:'',
      imgUrlList: [],
      fileList: [],
      dialogVisible:false,
      visible:false,
      base:"",
      files:'',
      uid: '',
      mid: '',
      ruleForm: {
        title: '',
        bugDescription: '',
        bugRecurrentSteps:'',
        deviceInformation:''
      },
      rules: {
        title: [
          {required: true, message: '请输入报告主题', trigger: 'blur'},
        ],
        bugDescription: [
          {required: true, message: '请输入漏洞描述信息', trigger: 'blur'},
        ],
        bugRecurrentSteps: [
          {required: true, message: '请输入漏洞复现步骤', trigger: 'blur'},
        ],
        deviceInformation: [
          {required: true, message: '请输入设备详细信息', trigger: 'blur'},
        ]
      }
    };
  },
  mounted() {
    //将上一级的界面保存取出来
    this.uid=this.$storage.get("uid");
    this.fid=this.$route.query.fid;
    this.mid=this.$route.query.mid;
    console.log("uid:");
    console.log(this.uid);
    console.log("mid:");
    console.log(this.mid);
    console.log("fid:"+this.fid);

  },
  computed: {},
  methods: {
    updata(event){
      console.log("here")
      if(this.imgUrlList.length>=4){
        this.$message.error("最多上传4张图片！")
        return;
      }
      console.log("here")
      this.visible=true
      event.preventDefault()
      let file=event.target.files[0] //根据事件源找到上传的file
      if(file==null) return
      let formData = new FormData();
      formData.append('multipartFile',file);//键名要和后台一致
      const instance=axios.create({
        withCredentials: true
      })
      instance.post('/collect/file/upload',formData).then(res=>{
        console.log(res.data.data)
        this.imgUrlList.push(res.data.data)
        this.$refs.cropperChild.setImage(event)
        event.target.value=''
      })
    },

    //get four params
    getData(args){
      console.log("i am father")
      //x,y,box
      let params=JSON.parse(args[0])
      //origin image
      let imageParams=args[1]

      console.log(params)
      console.log(imageParams)
      console.log(params.x*800/imageParams.naturalHeight)

      //小图不要
      if(imageParams.naturalWidth<450 || imageParams.naturalHeight<800){
        this.imgUrlList.pop()
        this.visible=false
        this.$message.error("请上传分辨率在800*450以上的图片！")
        return
      }

      let coodinate=[]
      let column_min,column_max,row_min,row_max
      if(imageParams.naturalHeight/imageParams.naturalWidth>16/9){
        column_min=parseInt(params.x*800/imageParams.naturalHeight)
        column_max=parseInt((params.x+params.width)*800/imageParams.naturalHeight)
        row_min=parseInt(params.y*800/imageParams.naturalHeight)
        row_max=parseInt((params.y+params.height)*800/imageParams.naturalHeight)
      }else{
        column_min=parseInt(params.x*450/imageParams.naturalWidth)
        column_max=parseInt((params.x+params.width)*450/imageParams.naturalWidth)
        row_min=parseInt(params.y*450/imageParams.naturalWidth)
        row_max=parseInt((params.y+params.height)*450/imageParams.naturalWidth)
      }

      coodinate.push(column_min,column_max,row_min,row_max)
      console.log(coodinate)
      this.coordinates.push(coodinate)
      console.log(this.coordinates)
      //800/naturalHeight
      this.visible=false
      this.$message.success("上传成功！")
    },
    // 提交
    onSubmit() {
      this.$refs["ruleForm"].validate(valid => {
        let dataStruct={
          "uid":this.uid,
          "mid":this.mid,
          "title":this.ruleForm.title,
          "submitTime":Date.now(),
          "bugDescription":this.ruleForm.bugDescription,
          "bugRecurrentSteps":this.ruleForm.bugRecurrentSteps,
          "deviceInformation":this.ruleForm.deviceInformation,
          "picture1":this.imgUrlList[0],
          "picture2":this.imgUrlList[1],
          "picture3":this.imgUrlList[2],
          "picture4":this.imgUrlList[3],
          "coordinate1":this.coordinates[0],
          "coordinate2":this.coordinates[1],
          "coordinate3":this.coordinates[2],
          "coordinate4":this.coordinates[3],
        };
        console.log(this.dataStruct);
        if (valid) {
          console.log(dataStruct)
          if (this.fid) {
            let params={
              "fid":this.fid,
              "uid":this.uid
            }
            console.log("xiezuobaogao")
            this.$http({
              url: `report/submitreport`,
              method: "post",
              params:params,
              data: dataStruct
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.$router.go(-1)
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          } else {
            //主报告提交
            let loadingInstance = Loading.service({fullscreen: true,text: "请稍候，正在为您分析提交结果~"})
            this.$http({
              url: `fetchmission/submitreport?uid=${this.uid}&mid=${this.mid}`,
              method: "post",
              data: dataStruct
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
                let submitFid = data.fid
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 100,
                  onClose: () => {
                    loadingInstance.close()
                    this.$router.push({
                      path:'/report/similarlist',
                      query:{
                        fid:submitFid,
                        mid:this.mid
                      }
                    })
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
  },
  components:{
    MyCropper
  }
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
