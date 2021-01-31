<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="任务名">
        <el-input v-model="pageData.taskName" placeholder="请输入任务名" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="积分">
        <el-input-number v-model="pageData.point" controls-position="right" size="small" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageData.type"  size="small">
          <el-radio :label="2">按周循环</el-radio>
          <el-radio :label="3" disabled>按月循环</el-radio>
          <el-radio :label="4" disabled>按年循环</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="pageData.description" placeholder="请描述你的任务" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item v-if="taskId === '0'" label="立即生成">
        <el-switch v-model="pageControl.isCreateDailyTask"></el-switch>
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
        point: 0,
        type: 2,
        cycle: '1'
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
      console.info(this.flagId)
      if (this.taskId === '0') {
        console.info('新增')
        this.pageData.flagId = this.flagId
        newTaskAPI(
          this.pageData
        ).then(response => {
          if (response.data.success === true) {
            this.$message.success('新增任务成功')
          } else {
            this.$message.error('新增任务失败')
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
            this.$message.success('编辑任务成功')
          } else {
            this.$message.error('编辑任务失败')
          }
        })
      }
      // 新增周期任务并立即生成周期任务
      if (this.pageControl.isCreateDailyTask) {
        this.createDailyTask()
      }
      this.$store.commit('setTaskVisible', false)
      console.info('taskId' + this.taskId)
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
