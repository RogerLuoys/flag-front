<template>
  <div>
    <el-dialog title="编辑任务" :visible.sync="dialogVisible">
      <template #title>
        <span>编辑任务</span>
      </template>
      <el-form :model="pageData" label-width="2cm">
        <el-form-item label="任务名">
          <el-input v-model="pageData.taskName" size="small" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="积分">
          <el-input-number v-model="pageData.point" controls-position="right" size="small" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="pageData.type"  size="small">
            <el-radio :label="2">按周循环</el-radio>
            <el-radio :label="3">按月循环</el-radio>
            <el-radio :label="4">按年循环</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="pageData.description" type="textarea" maxlength="200" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="立即生成">
          <el-switch v-model="pageControl.isCreateDailyTask"></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: center">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="small">保 存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {newTaskAPI, modifyTaskAPI, queryTaskAPI} from '@/api/task'

export default {
  props: {
    flagId: String,
    taskId: String,
    dialogVisible: Boolean
  },
  data () {
    return {
      pageData: {
        taskName: 'taskName',
        description: 'description',
        point: 0,
        type: 2,
        cycle: 'Mon'
      },
      pageControl: {
        isCreateDailyTask: false,
        dialogVisible: false
      }
    }
  },
  created: function () {
    console.info(this.flagId)
    // this.pageControl.dialogVisible = this.dialogVisible
    if (this.taskId === '0') {
      this.restoreData()
    } else {
      this.queryTask()
    }
  },
  methods: {
    onSubmit () {
      console.info(this.flagId)
      if (this.taskId === '0') {
        console.info('新增')
        newTaskAPI({
          flagId: this.flagId,
          taskName: this.pageData.taskName,
          description: this.pageData.description,
          point: this.pageData.point,
          type: this.pageData.type,
          cycle: this.pageData.cycle
        }).then(response => {
          if (response.data.success === true) {
            console.info('新增任务成功')
            this.dialogVisible = false
          }
        })
      } else {
        console.info('修改')
        modifyTaskAPI({
          taskId: this.taskId,
          taskName: this.pageData.taskName,
          description: this.pageData.description,
          point: this.pageData.point,
          type: this.pageData.type,
          cycle: this.pageData.cycle
        }).then(response => {
          if (response.data.success === true) {
            console.info('新增任务成功')
          }
        })
      }
      if (this.pageControl.isCreateDailyTask) {
        this.createDailyTask()
      }
      console.info('taskId' + this.taskId)
    }
  },
  queryTask () {
    queryTaskAPI({
      taskId: this.taskId
    }).then(response => {
      if (response.data.success === true) {
        this.pageData = response.data.data
        console.info('查询成功')
      }
    })
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
