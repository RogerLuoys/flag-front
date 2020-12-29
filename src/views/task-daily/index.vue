<template>
  <div>
    <el-button @click="queryTaskDailyList">test</el-button>
    <el-calendar>
      <template #dateCell="{data}">
        <!--判断当前日是否有任务-->
        <div v-if="getAllDates().indexOf(data.day) !== -1">
          <!--按日期展示任务-->
          <el-tooltip  placement="left-start" effect="light">
            <template #content>
              <div v-for="(item, index) in pageData.tasks" :key="index">
                <div v-if="item.startTime === data.day">
                  {{item.taskDailyName}}
                </div>
              </div>
            </template>
            <div>
              <el-link @click="newTask(data.day)">
                {{ data.day.split('-').slice(2).join('-') }}
              </el-link>
              <br/>
              <el-link type="primary" @click="callDialog(data.day)">今日有任务</el-link>
            </div>
          </el-tooltip>
        </div>
        <div v-else>
          <div>
            <el-link @click="newTask(data.day)">
              {{ data.day.split('-').slice(2).join('-') }}
            </el-link>
            <span v-if="data.isSelected === true">
              <br/>
              <span>点日期新增当日任务</span>
            </span>
          </div>
        </div>
      </template>
    </el-calendar>
    <el-dialog title="今日任务" :visible.sync="pageControl.listDialogVisible">
      <el-collapse accordion>
        <div v-for="(item, index) in pageData.tasks" :key="index">
          <div v-if="item.startTime === pageControl.selectedDay">
            <el-collapse-item>
              <template #title>
                {{item.taskDailyName}}<i class="header-icon el-icon-info"></i>
              </template>
              <div>简介：{{item.description}}</div>
              <div>状态：{{item.status}}</div>
              <div v-if="item.status === 2">已完成</div>
              <div v-else-if="item.status === 1 && item.bindType === 1">
                <el-button type="primary" size="mini" @click="completeTaskDaily(item.taskDailyId)" plain>完成</el-button>
                <el-button type="primary" size="mini" plain>撤销</el-button>
              </div>
              <div v-else-if="item.status === 1 && item.bindType === 2">
                <el-button type="primary" size="mini" plain>提醒</el-button>
              </div>
              <div v-else>异常状态</div>
            </el-collapse-item>
          </div>
        </div>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pageControl.listDialogVisible = false" type="primary" plain>知道了</el-button>
        <!--<el-button type="primary" @click="pageControl.dialogVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
    <el-dialog title="新增临时任务" :visible.sync="pageControl.newDialogVisible">
      <task-daily-detail :selectedDay="pageControl.selectedDay"></task-daily-detail>
    </el-dialog>
  </div>
</template>

<script>
import taskDailyDetail from './task-daily-detail'
import {queryTaskDailyListAPI, modifyTaskDailyStatusAPI} from '@/api/taskDaily'

export default {
  components: {taskDailyDetail},
  data () {
    return {
      pageData: {
        tasks: [
          // {
          //   startTime: '2020-12-13',
          //   taskDailyName: '喝热水',
          //   description: '每天早上喝一大杯热水',
          //   bindType: 1,
          //   status: 1
          // },
          // {
          //   startTime: '2020-12-13',
          //   taskDailyName: '发呆',
          //   description: '每天晚上发呆自省',
          //   bindType: 2,
          //   status: 2
          // },
          // {
          //   startTime: '2020-12-14',
          //   taskDailyName: '冥想',
          //   description: '修仙ing',
          //   bindType: 2,
          //   status: 1
          // }
        ]
      },
      pageControl: {
        listDialogVisible: false,
        newDialogVisible: false,
        disable: false,
        selectedDay: '',
        activeName: '-1'
      }
    }
  },
  created: function () {
    this.queryTaskDailyList()
  },
  methods: {
    completeTaskDaily (taskDailyId) {
      modifyTaskDailyStatusAPI({
        taskDailyId: taskDailyId,
        status: 2
      }).then(response => {
        if (response.data.success === true) {
          this.queryTaskDailyList()
        }
      })
    },
    queryTaskDailyList () {
      let today = new Date()
      queryTaskDailyListAPI({
        currentYear: today.getFullYear()
      }).then(response => {
        if (response.data.success === true) {
          this.pageData.tasks = response.data.data
          console.info('查询任务成功' + this.pageData.tasks)
          this.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          })
        } else {
          this.$message.error('错了哦，这是一条错误消息')
        }
      })
    },
    getAllDates () {
      let startTimes = ''
      let myTask = this.pageData.tasks
      for (let i = 0; i < myTask.length; i++) {
        startTimes = startTimes + ' ' + myTask[i].startTime
      }
      console.info('所有日期' + startTimes)
      return startTimes
    },
    callDialog (selectedDay) {
      this.pageControl.listDialogVisible = true
      this.pageControl.selectedDay = selectedDay
    },
    newTask (selectedDay) {
      this.pageControl.selectedDay = selectedDay
      this.pageControl.newDialogVisible = true
      // console.info('新增任务' + selectedDay)
    }
  }
}
</script>

<style scoped>

</style>
