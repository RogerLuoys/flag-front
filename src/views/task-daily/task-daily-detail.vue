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
    </div>
  </div>
</template>

<script>
import {newTaskDailyAPI} from '@/api/taskDaily'

export default {
  props: {
    selectedDay: {
      type: Date
    }
  },
  data () {
    return {
      pageData: {
        flagId: '',
        taskDailyName: 'taskDailyName',
        description: 'description',
        point: 0,
        startTime: null,
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
      console.info('新增')
      newTaskDailyAPI(
        this.pageData
      ).then(response => {
        if (response.data.success === true) {
          console.info('新增任务成功')
        }
      })
    }
  },
  restoreData () {
    this.pageData.taskName = ''
    this.pageData.description = ''
    this.pageData.point = 0
    this.pageData.type = 2
    this.pageData.cycle = 'Mon'
  },
  createDailyTask () {
    console.info('创建每日任务')
  }
}
</script>

<style scoped>

</style>
