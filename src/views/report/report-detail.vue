<template>
  <div>
    <el-button @click="queryReportDetail">test</el-button>
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
        v-for="(activity, index) in pageData.taskDailyList"
        :key="index"
        :timestamp="activity.timestamp">
        {{activity.taskDailyName}} {{activity.comment}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    flagId: {
      type: String
    }
  },
  data () {
    return {
      pageData: {
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
  },
  created: function () {
    this.queryReportDetail()
  },
  updated: function () {
    this.queryReportDetail()
  },
  mounted: function () {
    this.queryReportDetail()
  },
  methods: {
    queryReportDetail () {
      console.info('查询详情啊a' + this.flagId)
    }
  }
}
</script>

<style scoped>

</style>
