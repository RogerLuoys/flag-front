<template>
  <el-container>
    <el-aside style="height: 12cm">
      <div v-for="(item, index) in pageData.reportList" :key="index">
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
      <div>{{pageData.reportDetail.flagName}}</div>
      <el-divider>基本信息</el-divider>
      <el-form ref="form" :model="pageData.reportDetail" label-width="80px">
        <el-form-item label="预期目标">
          <span>{{pageData.reportDetail.expected}}</span>
        </el-form-item>
        <el-form-item label="实际成果">
          <span>{{pageData.reportDetail.actual}}</span>
        </el-form-item>
        <el-form-item label="见证人">
          <span>{{pageData.reportDetail.witnessName}}</span>
        </el-form-item>
      </el-form>
      <el-divider>任务日记</el-divider>
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in pageData.reportDetail.reportLogList"
          :key="index"
          :timestamp="activity.endTime">
          {{activity.taskDailyName}} {{activity.comment}}
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
import reportDetail from './report-detail'
import {queryReportListAPI, queryReportDetailAPI} from '@/api/report'

export default {
  components: {reportDetail},
  data () {
    return {
      pageData: {
        reportList: [{
          flagId: 'flagId123',
          flagName: 'flagName',
          totalPoint: 0,
          totalTaskDaily: 0
        },
        {
          flagId: 'flagId321',
          flagName: 'flagName',
          totalPoint: 0,
          totalTaskDaily: 0
        }],
        reportDetail: {
          flagName: 'flagName',
          description: 'description',
          expected: 'expected',
          actual: 'actual',
          witnessID: '--',
          witnessName: 'witnessName',
          startDate: '',
          endDate: '--',
          reportLogList: [{
            taskDailyName: '看书',
            comment: '今天看了三本书，收获很大',
            endTime: '2018-04-15'
          }]
        }
      },
      pageControl: {
        selectedFlagId: ''
      }
    }
  },
  created: function () {
    this.queryReportList()
  },
  methods: {
    queryReportList () {
      console.info('查询列表')
      queryReportListAPI().then(response => {
        if (response.data.success === true) {
          this.pageData.reportList = response.data.data
        }
      })
    },
    queryReportDetail (flagId) {
      console.info('查询列表')
      queryReportDetailAPI({
        flagId: flagId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData.reportDetail = response.data.data
        }
      })
    }
    // changeSelectedFlagId (flagId) {
    //   this.pageControl.selectedFlagId = flagId
    //   console.info('查询详情' + this.pageControl.selectedFlagId)
    // }
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
