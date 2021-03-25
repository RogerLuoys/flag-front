<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.taskName" placeholder="请输入任务名" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="积分">
        <el-input-number v-model="pageData.point" controls-position="right" size="small" :min="1" :max="10000"></el-input-number>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type"  size="small">
          <el-radio :label="2">按周循环</el-radio>
          <el-radio :label="3" disabled>按月循环</el-radio>
          <el-radio :label="4" disabled>按年循环</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="周期">
        <el-checkbox-group v-model="pageData.cycleList">
          <el-checkbox label="1">周一</el-checkbox>
          <el-checkbox label="2">周二</el-checkbox>
          <el-checkbox label="3">周三</el-checkbox>
          <el-checkbox label="4">周四</el-checkbox>
          <el-checkbox label="5">周五</el-checkbox>
          <el-checkbox label="6">周六</el-checkbox>
          <el-checkbox label="7">周日</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请描述你的任务" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="pageData.status"  size="small">
          <el-radio :label="1">停用</el-radio>
          <el-radio :label="2">启用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="onSubmit"  size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
import {newTaskAPI, modifyTaskAPI, queryTaskAPI} from '@/api/task'

export default {
  props: {
    flagId: {
      type: String,
      default: '0'
    },
    taskId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      pageData: {
        flagId: '',
        taskName: '',
        description: '',
        point: 1,
        type: 2,
        status: 1,
        cycleList: []
      },
      pageControl: {
        isCreateDailyTask: false
      }
    }
  },
  created: function () {
    console.info(this.flagId)
    if (this.taskId === '0') {
      this.restoreData()
    } else {
      this.queryTask()
    }
  },
  methods: {
    onSubmit () {
      if (this.taskId === '0') {
        this.pageData.flagId = this.flagId
        newTaskAPI({
          flagId: this.pageData.flagId,
          taskName: this.pageData.taskName,
          description: this.pageData.description,
          point: this.pageData.point,
          type: this.pageData.type,
          status: this.pageData.status,
          cycleList: this.pageData.cycleList
        }).then(response => {
          if (response.data.success === true) {
            this.$message.success('新增任务成功')
            this.$store.commit('setTaskVisible', false)
          } else {
            this.$message.error('新增任务失败')
          }
        })
      } else {
        modifyTaskAPI({
          taskId: this.taskId,
          taskName: this.pageData.taskName,
          description: this.pageData.description,
          point: this.pageData.point,
          type: this.pageData.type,
          cycleList: this.pageData.cycleList
        }).then(response => {
          if (response.data.success === true) {
            this.$message.success('编辑任务成功')
            this.$store.commit('setTaskVisible', false)
          } else {
            this.$message.error('编辑任务失败')
          }
        })
      }
      // 新增周期任务并立即生成周期任务
      if (this.pageControl.isCreateDailyTask) {
        this.createDailyTask()
      }
    },
    queryTask () {
      queryTaskAPI({
        taskId: this.taskId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    restoreData () {
      this.pageData.taskName = ''
      this.pageData.description = ''
      this.pageData.point = 1
      this.pageData.type = 2
      this.pageData.cycle = '1'
    },
    createDailyTask () {
      console.info('创建每日任务')
    }
  }
}
</script>

<style scoped>

</style>
