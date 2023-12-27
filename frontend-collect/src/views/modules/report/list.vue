<template>
  <div class="main-content">
    <!-- 列表页 -->
    <div>
      <div class="table-content">
        <el-form>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button round @click="getDataList()">全部报告</el-button>
                <el-button round @click="searchBadReports()">查询低质量报告</el-button>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="排序方式">
                <el-radio-group v-model="order" size="small" @change="changeStorage">
                  <el-radio-button label="Asc">升序</el-radio-button>
                  <el-radio-button label="Desc">降序</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序指标">
                <el-radio-group v-model="orderKey" size="small" @change="changeStorage">
                  <el-radio-button label="submitTime">按提交时间排序</el-radio-button>
                  <el-radio-button label="score">按评分排序</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button round @click="reset()">恢复默认排序</el-button>
            </el-col>
          </el-row>


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
              prop="score"
              header-align="center"
              align="center"
              sortable
              label="评分">
            <template slot-scope="scope">
                <el-rate v-if="scope.row.score>0" style="margin-top: 0.7em" v-model="scope.row.score" disabled text-color="#ff9900"></el-rate>
                <el-tag v-else>暂无评分</el-tag>
<!--              {{scope.row.score}}-->
            </template>
          </el-table-column>
          <el-table-column
              prop="submitTime"
              header-align="center"
              align="center"
              sortable
              autosize
              label="提交时间">
<!--            <template slot-scope="scope">-->

<!--            </template>-->
          </el-table-column>
          <el-table-column
              header-align="center"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" size="small"
                         @click="watchReport(scope.row.fid,scope.row.mid)">详情
              </el-button>
              <el-button v-if="userType ==='employee' && loginUid != scope.row.uid" type="text" icon="el-icon-edit" size="small"
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

import moment from "moment"
export default {
  data() {
    return {
      order:'',
      orderKey:'',
      mode:'totalScoreDesc',

      // submitTimeAsc submitTimeDesc scoreAsc scoreDesc

      searchForm: {
        key: ""
      },
      loginUid:'',
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
    this.mid=this.$route.query.mid
    this.userType=this.$storage.get("userType")
    this.loginUid=this.$storage.get("uid")
    console.log(this.loginUid)
    this.getDataList();
  },
  filters: {
    htmlfilter: function (val) {
      return val.replace(/<[^>]*>/g).replace(/undefined/g, '');
    }
  },
  methods: {
    reset(){
      this.order=''
      this.orderKey=''
      this.mode='totalScoreDesc'
      this.getDataList()
    },
    changeStorage(){
      if(this.order===''){
        this.$message.error("请选择排序方式！")
        return
      }
      if(this.orderKey===''){
        this.$message.error("请选择排序指标！")
        return;
      }
      this.mode=this.orderKey+this.order
      this.getDataList()
    },
    searchBadReports() {
      this.dataListLoading = true;
      this.mid=this.$route.query.mid;
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
          for(let i=0;i<this.dataList.length;i++){
            this.dataList[i].submitTime=moment(new Date(this.dataList[i].submitTime)).format("YYYY-MM-DD hh:mm:ss")
          }
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
      this.mid=this.$route.query.mid;
      let params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        mode: this.mode
      }
      console.log(params)
      this.$http({
        url: `/fetchmission/searchreportsbymid?mid=${this.mid}`,
        method: "get",
        params: params
      }).then(({data}) => {
        if (data) {
          this.dataList = data.list;
          for(let i=0;i<this.dataList.length;i++){
            this.dataList[i].submitTime=moment(new Date(this.dataList[i].submitTime)).format("YYYY-MM-DD hh:mm:ss")
          }
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
    watchReport(fid,mid){
      console.log(fid)
      this.$router.push({
        path:'/report/detail',
        query:{
          fid:fid,
          mid:mid
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
