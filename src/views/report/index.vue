<template>
  <el-container>
    <el-aside>
      <div v-for="(item, index) in 10" :key="index">
        <el-card class="box-card">
          <template #header class="clearfix">
            <span>FLAG名称{{item}}</span>
          </template>
          <div class="text item">
            获得总积分：***
          </div>
          <div class="text item">
            完成总任务：***
          </div>
        </el-card>
      </div>
    </el-aside>
    <el-main>
      <div>FlagA</div>
      <el-divider>基本信息</el-divider>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="预期目标">
          <span>****</span>
        </el-form-item>
        <el-form-item label="实际成果">
          <span>****</span>
        </el-form-item>
        <el-form-item label="见证人">
          <span>****</span>
        </el-form-item>
      </el-form>
      <el-divider>任务日记</el-divider>
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in pageControl.reportDetail.taskDailyList"
          :key="index"
          :timestamp="activity.timestamp">
          {{activity.taskDailyName}} {{activity.comment}}
        </el-timeline-item>
      </el-timeline>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      pageData: [],
      pageControl: {
        listDialogVisible: false,
        newDialogVisible: false,
        disable: false,
        selectedDay: '',
        activeName: '-1',
        reportDetail: {
          flagId: '2',
          flagName: '--',
          description: '--',
          witnessID: '--',
          witnessName: '--',
          type: '1',
          priority: '--',
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
    width: 300px;
  }
</style>
