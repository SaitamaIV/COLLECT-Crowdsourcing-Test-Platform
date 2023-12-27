<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div>
      <el-form :inline="true" :model="searchForm" class="form-content">
        <el-form-item label="任务名称">
          <el-input v-model="searchForm.name"
                    placeholder="任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input v-model="searchForm.description"
                    placeholder="描述信息" clearable></el-input>
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
                         @click="giveUpMission(scope.row.mid)">放弃任务
              </el-button>
              <el-button v-if="userType=='employee'" type="text" icon="el-icon-edit" size="small"
                         @click="watchMyReport(scope.row.mid)">我的报告
              </el-button>
              <el-button v-if="userType=='employee'" type="text" icon="el-icon-edit" size="small"
                         @click="submitReport(scope.row.mid)">提交测试报告
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
        key: ""
      },
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
    this.userType=this.$storage.get("userType");
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
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      if (this.searchForm.name != '' && this.searchForm.name != undefined) {
        params['name'] = '%' + this.searchForm.name + '%'
      }
      if (this.searchForm.description != '' && this.searchForm.desciption != undefined) {
        params['description'] = '%' + this.searchForm.desciption + '%'
      }
      if (this.userType=='employer')
      {
        this.$http({
        url: `/mission/sendersearchmissionsbyuid?uid=${this.$storage.get("uid")}`,
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
      });}
      if (this.userType=='employee') {
        this.$http({
        url: `/mission/workersearchmissionsbyuid?uid=${this.$storage.get('uid')}`,
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
      });}
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
    watchMission(mid) {
      // console.log(mid);
      // console.log(type);
      //type为detail代表详情，type为edit代表修改。
      this.$router.push({
        path:'/mission/detail',
        query:{
          mid:mid,
          isMylist:"true",
        }
      })
    },
    watchMyReport(mid){
      let params={
        uid:this.$storage.get("uid"),
        mid:mid
      }
      this.$http({
        url: `fetchmission/searchreportbyids`,
        method: "get",
        //注：迭代一先不分页，把下面的注释掉即可。
        params: params
      }).then(({data}) => {
        console.log(data)
        let fid=data.fetchmission.fid
        this.$router.push({
          path:'/report/detail',
          query:{
            fid:fid,
          }
        })
      });


    },
    submitReport(mid){
      this.$router.push({
        path:'/report/edit',
        query:{
          mid:mid,
        }
      })
    },
    // 下载
    download(file) {
      window.open(`${file}`)
    },
    // 放弃任务
    giveUpMission(id) {
      var ids = id
          ? [Number(id)]
          : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确认放弃任务?`, "提示", {
        confirmButtonText: "残忍离开",
        cancelButtonText: "算了吧",
        type: "warning"
      }).then(() => {
        this.$http({
          url: `/fetchmission/giveupmission?uid=${this.$storage.get('uid')}&mid=${id}`,
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