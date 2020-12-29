<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.taskDailyName" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="积分">
        <el-input-number v-model="pageData.point" controls-position="right" size="small" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="关联Flag">
        <el-input v-model="pageData.flagId" size="small"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit"  size="small">保存</el-button>
      <el-button type="primary" @click="test1()"  size="small">test</el-button>
    </div>
  </div>
</template>

<script>
import {newTaskDailyAPI} from '@/api/taskDaily'

export default {
  props: {
    selectedDay: {
      type: String,
      default: '1970-01-01'
    }
  },
  data () {
    return {
      pageData: {
        flagId: '',
        taskDailyName: 'taskDailyName',
        description: 'description',
        point: 0,
        startTime: Date,
        endTime: null
      },
      pageControl: {
        isCreateDailyTask: false
      }
    }
  },
  created: function () {
    console.info('新增任务' + this.selectedDay)
  },
  methods: {
    onSubmit () {
      let day = new Date(this.selectedDay);
      console.info('新增')
      newTaskDailyAPI({
        flagId: this.pageData.flagId,
        taskDailyName: this.pageData.taskDailyName,
        description: this.pageData.description,
        point: this.pageData.point,
        startTime: day,
        endTime: this.selectedDay
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增任务成功，点X关闭弹窗')
        } else {
          this.$message.success('新增任务成功，点X关闭弹窗')
        }
      })
    },
    restoreData () {
      this.pageData.flagId = ''
      this.pageData.taskDailyName = ''
      this.pageData.description = ''
      this.pageData.point = 0
      this.pageData.startTime = ''
      this.pageData.endTime = ''
    },
    test1 () {
      let d = new Date('2020-12-01')
      console.info('测试' + d)
      this.$message.error('错了哦，这是一条错误消息')
      console.info('选中日期' + this.selectedDay)
    }
  }
}
</script>

<style scoped>

</style>
