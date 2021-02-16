<template>
  <div>
    <div>{{pageData.flagName}}</div>
    <el-divider>基本信息</el-divider>
    <el-form ref="form" :model="pageData" label-width="80px">
      <el-form-item label="预期目标">
        <span>{{pageData.expected}}</span>
      </el-form-item>
      <el-form-item label="实际成果">
        <span>{{pageData.actual}}</span>
      </el-form-item>
      <el-form-item label="见证人">
        <span>{{pageData.witnessName}}</span>
      </el-form-item>
    </el-form>
    <el-divider>任务日记</el-divider>
    <el-timeline :reverse="true">
      <el-timeline-item
        v-for="(item, index) in pageData.reportLogList"
        :key="index"
        :timestamp="item.endTime">
        {{item.taskDailyName}} {{item.comment}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import {queryReportDetailAPI} from '@/api/report'

export default {
  data () {
    return {
      pageData: {
        flagName: '--',
        description: '--',
        expected: '--',
        actual: '--',
        witnessID: '--',
        witnessName: '--',
        startDate: '',
        endDate: '',
        reportLogList: []
      }
    }
  },
  created: function () {
    this.queryReportDetail()
  },
  watch: {
    '$store.state.report.selectedFlagId': function (newVal, oldVal) {
      this.queryReportDetail()
    }
  },
  methods: {
    queryReportDetail () {
      queryReportDetailAPI({
        flagId: this.$store.state.report.selectedFlagId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
