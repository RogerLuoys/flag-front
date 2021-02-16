<template>
  <el-container>
    <el-aside style="height: 12cm">
      <div v-for="(item, index) in pageData" :key="index">
        <el-row>
          <el-card class="box-card">
            <template #header class="clearfix">
              <el-button type="text" @click="queryReportDetail(item.flagId)">{{item.flagName}}</el-button>
              <el-tag>已完成</el-tag>
            </template>
            <div class="text item">
              获得总积分：{{item.totalPoint}}
            </div>
            <div class="text item">
              完成总任务：{{item.totalTaskDaily}}
            </div>
          </el-card>
        </el-row>
      </div>
    </el-aside>
    <el-main style="height: 12cm">
      <report-detail></report-detail>
    </el-main>
  </el-container>
</template>

<script>
import reportDetail from './report-detail'
import {queryReportListAPI} from '@/api/report'

export default {
  components: {reportDetail},
  data () {
    return {
      pageData: []
    }
  },
  created: function () {
    this.queryReportList()
  },
  methods: {
    queryReportList () {
      queryReportListAPI().then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          if (this.pageData[0].flagId !== null) {
            this.$store.commit('setSelectedFlagId', this.pageData[0].flagId)
          }
        }
      })
    },
    queryReportDetail (flagId) {
      this.$store.commit('setSelectedFlagId', flagId)
    }
  }
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 270px;
  }
</style>
