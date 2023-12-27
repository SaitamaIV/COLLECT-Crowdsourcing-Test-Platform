<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div>
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-form-item label="任务名称">
          <el-input v-model="searchForm.name"
                    placeholder="任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button round @click="search()">查询</el-button>
        </el-form-item>
        <el-form-item v-if="userType=='employer'">
          <el-button round @click="addMission()">发布</el-button>
        </el-form-item>
        <el-form-item v-if="userType=='employee'">
          <el-button round @click="recommend()">推荐</el-button>
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
              prop="name"
              header-align="center"
              align="center"
              sortable
              label="任务名称">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
              prop="description"
              header-align="center"
              align="center"
              sortable
              label="描述信息">
            <template slot-scope="scope">
              {{scope.row.description}}
            </template>
          </el-table-column>
          <el-table-column
              prop="missionType"
              header-align="center"
              align="center"
              sortable
              label="任务类型">
            <template slot-scope="scope">
              {{scope.row.missionType}}
            </template>
          </el-table-column>
          <el-table-column
              prop="workerNum"
              header-align="center"
              align="center"
              sortable
              label="最大人数">
            <template slot-scope="scope">
              {{scope.row.workerNum}}
            </template>
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="watchMission(scope.row.mid)">详情
              </el-button>
              <el-button v-if="userType=='employee'" type="text" icon="el-icon-edit" size="small"
                          @click="fetchMission(scope.row.mid)">接包
              </el-button>
              <el-button v-if="userType=='admin'" type="text" icon="el-icon-delete" size="small"
                         @click="deleteMission(scope.row.mid)">删除
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
        name:''
      },
      uid:'',
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dataListLoading: false,
      dataListSelections: [],
      userType:''
    };
  },
  mounted() {
    this.uid=this.$storage.get("uid");
    console.log("uid:");
    console.log(this.uid);
    this.getDataList();
    this.userType=this.$storage.get("userType");
    console.log(this.userType);
    console.log(this.$storage.uid);
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  methods: {
    recommend(){
      this.dataListLoading = true;
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.$http({
        url: `mission/recommendation?uid=${this.uid}`,
        method: "get",
        //注：迭代一先不分页，把下面的注释掉即可。
        params: params
      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          this.total = data.total;
          console.log(this.dataList);
          console.log(this.total);
        } else {
          this.dataList = [];
          this.total = 0;
        }
        this.dataListLoading = false;
      });

    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.$http({
        url: `mission/searchmissionsbymissionname?missionName=${this.searchForm.name}`,
        method: "get",
        //注：迭代一先不分页，把下面的注释掉即可。
        params: params
      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          this.total = data.total;
          console.log(this.dataList);
          console.log(this.total);
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
    addMission() {
      //type为detail代表详情，type为edit代表修改。
        this.$router.push({
          path:'/mission/edit',
        })
    },
    watchMission(mid) {
      //type为detail代表详情，type为edit代表修改。
      this.$router.push({
        path:'/mission/detail',
        query:{
          mid:mid,
        }
      })
    },

    // 接收任务
    fetchMission(id) {
      console.log(id);
      var ids = id
          ? [Number(id)]
          : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确认接收任务?`, "提示", {
        confirmButtonText: "接收任务",
        cancelButtonText: "算了吧",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `/fetchmission/fetchmission?uid=${this.$storage.get("uid")}&mid=${id}`,
          method: "post",
          data:{
            "fetchDate":Date.now()
          }
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
          }
          else this.$message.error(data.msg);
        });
      });
    },
    // 删除
    deleteMission(id) {
      console.log("当前删除的id为")
      console.log(id)
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
          url: `/mission/removemission?mid=${id}`,
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
