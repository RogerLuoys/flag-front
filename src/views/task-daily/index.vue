<template>
  <div>
    <el-calendar>
      <template #dateCell="{data}">
        <div v-if="getAllDates().indexOf(data.day) !== -1">
          <el-tooltip  placement="left-start" effect="light">

            <template #content>
              <div v-for="(item, index) in pageData.tasks" :key="index">
                <div v-if="item.date === data.day">
                  {{item.taskDailyName}}
                </div>
              </div>
            </template>
            <div>
              <div>{{ data.day.split('-').slice(2).join('-') }}</div>
              <el-link type="primary" @click="callDialog(data.day)">点击查看详情</el-link>
              <el-link type="primary" @click="newTask(data.day)">新增当日任务</el-link>
            </div>
          </el-tooltip>
        </div>
        <div v-else>
          <div>
            {{ data.day.split('-').slice(2).join('-') }}
          </div>
          <div v-if="data.isSelected === true">
            <el-link type="primary" @click="newTask(data.day)">新增当日任务</el-link>
          </div>
        </div>
      </template>
    </el-calendar>
    <el-dialog title="今日任务" :visible.sync="pageControl.listDialogVisible">
      <el-collapse accordion>
        <div v-for="(item, index) in pageData.tasks" :key="index">
          <div v-if="item.date === pageControl.selectedDay">
            <el-collapse-item>
              <template #title>
                {{item.taskDailyName}}<i class="header-icon el-icon-info"></i>
              </template>
              <div>简介：{{item.description}}</div>
              <div>状态：{{item.status}}</div>
              <div v-if="item.status === 2">已完成</div>
              <div v-else-if="item.status === 1 && item.type === 1">
                <el-button type="primary" size="mini" plain>完成</el-button>
              </div>
              <div v-else-if="item.status === 1 && item.type === 2">
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
import {queryTaskDailyAPI} from '@/api/taskDaily'

export default {
  components: {taskDailyDetail},
  data () {
    return {
      pageData: {
        tasks: [
          {
            date: '2020-12-13',
            taskDailyName: '喝热水',
            description: '每天早上喝一大杯热水',
            type: 1,
            status: 1
          },
          {
            date: '2020-12-13',
            taskDailyName: '发呆',
            description: '每天晚上发呆自省',
            type: 2,
            status: 2
          },
          {
            date: '2020-12-14',
            taskDailyName: '冥想',
            description: '修仙ing',
            type: 2,
            status: 1
          }
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
    this.queryTaskDaily()
  },
  methods: {
    queryTaskDaily () {
      let today = new Date()
      queryTaskDailyAPI({
        currentYear: today.getFullYear()
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
          console.info('查询任务成功')
        }
      })
    },
    getAllDates () {
      let dates = ''
      let myTask = this.pageData.tasks
      for (let i = 0; i < myTask.length; i++) {
        dates = dates + ' ' + myTask[i].date
      }
      console.info('所有日期' + dates)
      return dates
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
