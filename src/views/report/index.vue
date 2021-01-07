<template>
  <el-container>
    <el-aside>
      <div v-for="(item, index) in pageData" :key="index">
        <el-row>
          <el-card class="box-card">
            <template #header class="clearfix">
              <el-button type="text" @click="changeSelectedFlagId(item.flagId)">{{item.flagName}}</el-button>
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
    <el-main>
      <div>FlagA</div>
      <report-detail :flag-id="pageControl.selectedFlagId"></report-detail>
    </el-main>
  </el-container>
</template>

<script>
import reportDetail from './report-detail'

export default {
  components: {reportDetail},
  data () {
    return {
      pageData: [{
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
      }
      ],
      pageControl: {
        selectedFlagId: '',
        reportDetail: {
          flagId: '2',
          flagName: 'flagName',
          description: 'description',
          expected: 'expected',
          actual: 'actual',
          witnessID: '--',
          witnessName: 'witnessName',
          startDate: '',
          endDate: '--',
          taskDailyList: [{
            taskDailyName: '看书',
            comment: '今天看了三本书，收获很大',
            timestamp: '2018-04-15'
          }]
        }
      }
    }
  },
  created: function () {
    this.queryReportList()
  },
  methods: {
    queryReportList () {
      console.info('查询列表')
    },
    changeSelectedFlagId (flagId) {
      this.pageControl.selectedFlagId = flagId
      console.info('查询详情' + this.pageControl.selectedFlagId)
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
