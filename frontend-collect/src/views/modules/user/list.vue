<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div>
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickname"
                    placeholder="昵称" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchForm.username"
                    placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="search()">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="table-content">
        <el-table
            :data="dataList"
            border
            v-loading="dataListLoading"
            @selection-change="selectionChangeHandler"
            style="width: 100%;">
          <el-table-column
              type="selection"
              header-align="center"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
              prop="nickname"
              header-align="center"
              align="center"
              sortable
              label="昵称">
            <template slot-scope="scope">
              {{scope.row.nickname}}
            </template>
          </el-table-column>
          <el-table-column
              prop="username"
              header-align="center"
              align="center"
              sortable
              label="用户名">
            <template slot-scope="scope">
              {{scope.row.username}}
            </template>
          </el-table-column>
          <el-table-column
              prop="phoneNumber"
              header-align="center"
              align="center"
              sortable
              label="手机号">
            <template slot-scope="scope">
              {{scope.row.phoneNumber}}
            </template>
          </el-table-column>
          <el-table-column
              prop="email"
              header-align="center"
              align="center"
              sortable
              label="邮箱">
            <template slot-scope="scope">
              {{scope.row.email}}
            </template>
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="addOrUpdateHandler(scope.row.uid,'detail')">详情
              </el-button>
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="addOrUpdateHandler(scope.row.uid,'edit')">修改
              </el-button>
              <el-button type="text" icon="el-icon-delete" size="small"
                         @click="deleteHandler(scope.row.uid)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            class="pagination-content"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  data() {
    return {
      searchForm: {
        nickname: '',
        username: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dataListLoading: false,
      dataListSelections: [],
    };
  },
  mounted() {
    this.getDataList();
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  methods: {
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let pageparams = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      console.log(this.searchForm.nickname);
      console.log(this.searchForm.username);
      this.$http({
        url: "/user/searchusersbyname",
        method: "post",
        //这行注释用于后续页相关信息。
        params:pageparams,
        data: {
          "nickname":this.searchForm.nickname,
          "username":this.searchForm.username
        }

      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          this.total = data.total;
          console.log(this.dataList)
          console.log(this.total)
        } else {
          this.dataList = [];
          this.total = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id, type) {
      console.log(id);
      console.log(type);
      //type为detail代表详情，type为edit代表修改。
      this.$router.push({
        path:'/user/detail',
        query:{
          id:id,
          type:type
        }
      })
    },
    // 下载
    download(file) {
      window.open(`${file}`)
    },
    // 删除
    deleteHandler(id) {
      var ids = id
          ? [Number(id)]
          : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行删除操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `/user/removeuser?uid=${id}`,
          method: "post",
          //先只实现一个用户的查找。
          //  data: ids
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.search();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
