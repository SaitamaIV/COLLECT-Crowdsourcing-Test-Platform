<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div>
      <div class="table-content">
        <el-form>
          <el-form-item>
            <p>以下是与您的报告最相似的报告，您可以选择是否协作哦~</p>
          </el-form-item>
        </el-form>
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
              prop="title"
              header-align="center"
              align="center"
              sortable
              label="报告主题">
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column
              prop="bugDescription"
              header-align="center"
              align="center"
              sortable
              label="漏洞描述信息">
            <template slot-scope="scope">
              {{scope.row.bugDescription}}
            </template>
          </el-table-column>
          <el-table-column
              prop="isBad"
              header-align="center"
              align="center"
              sortable
              label="是否为低质量报告">
            <template slot-scope="scope">
              <i class="el-icon-check" v-if="scope.row.isBad=='True'" style="margin-top: 0.7em;color: green" disabled ></i>
              <i class="el-icon-loading" v-if="scope.row.isBad=='Judging'"></i>
              <i class="el-icon-close" v-if="scope.row.isBad=='False'"  style="color: red"></i>
              <!--              {{scope.row.score}}-->
            </template>
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="watchReport(scope.row.fid)">详情
              </el-button>
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="cooperationReport(scope.row.fid)">协作
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
      fid:'',
      mid:0,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      dataListLoading: false,
      dataListSelections: [],
    };
  },
  mounted() {
    this.fid=this.$route.query.fid
    //提交的报告的fid
    this.getDataList();
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  methods: {
    search() {
      this.dataListLoading = true;
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.$http({
        url: `/fetchmission/getbadreports?mid=${this.mid}`,
        method: "get",
        params: params
      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          console.log(this.dataList);
          this.total = data.total;
        } else {
          this.dataList = [];
          this.total = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }
      this.$http({
        url: `/fetchmission/getsimilarreports?fid=${this.fid}`,
        method: "get",
        params: params
      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          console.log(this.dataList);
          this.total = data.total;
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
    // 详情
    watchReport(fid){
      console.log(fid);
      this.$router.push({
        path:'/report/detail',
        query:{
          //这个是刚提交的报告的fid
          fid:fid
        }
      })
    },
    cooperationReport(fid){
      this.$router.push({
        path:'/report/edit',
        query:{
          fid:fid,
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
