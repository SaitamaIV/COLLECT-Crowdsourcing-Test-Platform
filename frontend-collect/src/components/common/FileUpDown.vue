<template >
  <input name="file" type="file" style=" background: #87C0FF;
  border-color: #87C0FF;
  color: #fff;
  outline: none;" @change="updata"/>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      fileList: [],
      dialogVisible:false,
      base:"",
      files:''
    };
  },
  methods: {
    updata(event){
      event.preventDefault()
      let file=event.target.files[0] //根据事件源找到上传的file
      let formData = new FormData();
      formData.append('multipartFile',file);//键名要和后台一致
      const instance=axios.create({
        withCredentials: true
      })
      instance.post('/collect/file/upload',formData).then(res=>{
        alert(res)
      })
    }
  }
}
</script>
<style>
</style>
