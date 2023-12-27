<template>
    <div>
        <img class="bg" src="@/assets/img/background.jpg">
        <el-form :model="rulesForm" :rules="rules" ref="rulesForm" class="login-form" >
            <img class="logo" src="@/assets/img/logo.png">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="rulesForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="rulesForm.password"></el-input>
            </el-form-item>
            <el-form-item label="" prop="userTypeName">
                <el-radio v-for="item in menus" v-bind:key="item.userTypeName" v-model="rulesForm.userTypeName"
                          :label="item.userTypeName">{{item.userTypeName}}
                </el-radio>
            </el-form-item>
            <el-form-item>

<!--              <el-button @click="login()" class="btn-login" type="primary">登录</el-button>-->
              <el-button @click="login()" type="primary">登录</el-button>
              <el-button plain
                         @click="register()"
                         type="success">
                          注册
              </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import menu from '@/utils/menu'

    export default {
        data() {
            return {
                rulesForm: {
                    username: "",
                    password: "",
                    // userTypeName: ""
                },
                menus: [],
                userType: "",
                rules: {
                    username: [{required: true, message: "请输入账号", trigger: "change"}],
                    password: [{required: true, message: "请输入密码", trigger: "change"}],
                    userTypeName: [{required: true, message: "请选择角色", trigger: "change"}]
                }
            };
        },
        mounted() {
            let menus = menu.list();
            this.menus = menus;
        },
        methods: {
            register(userType) {
                this.$router.push({path: '/register-director'})
            },
            // 登录
            login() {
                this.$refs["rulesForm"].validate(valid => {
                    let menus = this.menus;
                    for (let i = 0; i < menus.length; i++) {
                        if (menus[i].userTypeName == this.rulesForm.userTypeName) {
                            this.userType = menus[i].userType
                        }
                    }
                  if (valid){
                    this.$storage.set("userType", this.userType);
                    this.$storage.set("username", this.rulesForm.username);
                    this.$storage.set("userType", this.userType);
                    this.$router.replace({path: "/index/"});
                  }
                    // if (valid) {
                    //     this.$http({
                    //         url: `/user/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}&userType=${this.userType}`,
                    //         method: "post"
                    //     }).then(({data}) => {
                    //         if (data && data.code === 0) {
                    //             console.log(data);
                    //             this.$storage.set("Token", data.token);
                    //             this.$storage.set("userType", this.userType);
                    //             this.$storage.set("uid", data.uid);
                    //             this.$storage.set("username", this.rulesForm.username);
                    //             this.$router.replace({path: "/index/"});
                    //             // console.log(this.$storage.get("Token"));
                    //              //console.log(this.$storage.get("userType"));
                    //             // console.log(this.$storage.get("uid"));
                    //             // console.log(this.$storage.get("username"));
                    //         } else {
                    //             this.$message.error(data.msg);
                    //         }
                    //     });
                    // }
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
.logo{
  margin-left: 3.9em ;
  height: 5em;
  width: 14em;
}
.el-button{
  margin-left: 4.39em;
  margin-top: 1.6em;
  margin-bottom: 0.5em;
  width: 8em;
}
.el-form{
  background: aliceblue;
}
</style>