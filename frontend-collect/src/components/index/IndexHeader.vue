<template xmlns:el-dropdown-menu="http://www.w3.org/1999/html">
  <el-header>
    <el-menu
      mode="horizontal"
    >
<!--      <div class="fl title">{{this.$project.projectName}}</div>-->
      <div class="fl title" style="color: gold">{{this.$project.projectName}}</div>
      <div class="fr usercenter" style="display:flex;">
        <el-menu-item @click="menuHandler('contactUs')" index="7">
          <div>联系我们</div>
        </el-menu-item>
        <el-menu-item index="3">
<!--          <div>{{this.$storage.get('username')}}</div>-->
<!--          <el-submenu-->
<!--              :index="1+''"-->
<!--          >-->
<!--            <template slot="title">-->
<!--              <span>当前用户：{{ this.$storage.get('username') }}</span>-->
<!--            </template>-->
<!--            <el-menu-item-->
<!--                @click="menuHandler('updatePassword')"-->
<!--                :index="1-1"-->
<!--            >修改密码-->
<!--            </el-menu-item>-->
<!--            <el-menu-item-->
<!--                @click="menuHandler('center')"-->
<!--                :index="1-2"-->
<!--            >修改个人信息-->
<!--            </el-menu-item>-->
<!--            <el-menu-item @click="onLogout" index="2">-->
<!--              <div>退出登录</div>-->
<!--            </el-menu-item>-->
<!--          </el-submenu>-->
          <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="color: #FFFFFF">
                当前用户：{{this.$storage.get('username')}}
                <i class="el-icon-arrow-down el-icon--right"></i></span>

            <el-dropdown-menu
                :index="1+''">
                          <el-menu-item
                              style="background: lightcyan"
                              @click="menuHandler('updatePassword')"
                              :index="1-1"
                          >修改密码
                          </el-menu-item>
                          <el-menu-item
                              style="background: lightblue"
                              @click="menuHandler('center')"
                              :index="1-2"
                          >修改用户信息
                          </el-menu-item>
                          <el-menu-item
                              style="background: lightcyan"
                              @click="onLogout" index="2">
                            <div>退出登录</div>
                          </el-menu-item>

            </el-dropdown-menu>
          </el-dropdown>

        </el-menu-item>
      </div>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {}
    };
  },
  mounted(){
  },
  methods: {
    onLogout() {
      this.$storage.remove("Token")
      this.$storage.remove("userType")
      this.$storage.remove("uid")
      this.$storage.remove("username")
      this.$router.replace({ name: "login" });
    },
    menuHandler(name) {
        this.$router.push({name: name});
     },
  }
};
</script>


<style lang="scss" scoped>
.el-header .fr {
  float: right;
}
.el-header .fl {
  float: left;
}
.el-header {
  width: 100%;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  z-index: 99;
}
//.logo {
//  width: 60px;
//  height: 60px;
//  margin-left: 70px;
//}
.avator {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
}
.title {
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
}
.el-submenu{

}
</style>
