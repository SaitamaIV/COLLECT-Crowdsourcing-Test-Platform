<template>
  <el-aside class="index-aside" width="200px">
    <div class="index-aside-inner">
      <div v-for="item in menuList" v-bind:key="item.userType">
        <el-menu
            default-active="0"
            v-if="userType==item.userType"
        >
          <el-menu-item @click="menuHandler('home')" index="0">首页</el-menu-item>
          <el-submenu
              :index="1+''"
          >
            <template slot="title">
              <span>个人中心</span>
            </template>
            <el-menu-item
                @click="menuHandler('updatePassword')"
                :index="1-1"
            >修改密码
            </el-menu-item>
            <el-menu-item
                @click="menuHandler('center')"
                :index="1-2"
            >修改个人信息
            </el-menu-item>
          </el-submenu>
          <el-submenu
              v-for=" (menu,index) in item.backMenu"
              v-bind:key="menu.menu"
              :index="index+2+''"
          >
            <template slot="title">
              <span>{{menu.menu}}</span>
            </template>
            <el-menu-item
                v-for=" (child,sort) in menu.child"
                v-bind:key="sort"
                @click="menuHandler(child.tableName)"
                :index="(index+2)+'-'+sort"
            >{{child.menu}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </el-aside>
</template>
<script>
import menu from "@/utils/menu";

export default {
  data() {
    return {
      menuList: [],
      dynamicMenuRoutes: [],
      userType: ""
    };
  },
  mounted() {
    let menus = menu.list();
    this.menuList = menus;
    this.userType = this.$storage.get("userType");
  },
  methods: {
    menuHandler(name) {
      this.$router.push({name: name});
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
