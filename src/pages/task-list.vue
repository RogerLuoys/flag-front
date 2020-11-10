<template>
  <div>

    <el-calendar>
      <template #dateCell="{data}">
        <div v-if="getAllDates().indexOf(data.day) !== -1">
          <el-tooltip  placement="left-start" effect="light">

            <template #content>
              <div v-for="item in tasks" :key="item">
                <div v-if="item.date === data.day">
                  {{item.taskTopic}}
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
            <el-link type="info" :underline="false">今日无事</el-link>
            <el-link type="primary" @click="newTask(data.day)">新增当日任务</el-link>
          </div>
        </div>
      </template>
    </el-calendar>
    <el-dialog title="今日任务" :visible.sync="pageControl.dialogVisible">
      <el-collapse accordion>
        <div v-for="item in tasks" :key="item">
          <div v-if="item.date === pageControl.selectDay">
            <el-collapse-item>
              <template #title>
                {{item.taskTopic}}<i class="header-icon el-icon-info"></i>
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
        <el-button @click="pageControl.dialogVisible = false" type="primary" plain>知道了</el-button>
        <!--<el-button type="primary" @click="pageControl.dialogVisible = false">确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tasks: [
        {
          date: '2020-10-13',
          taskTopic: '喝热水',
          description: '每天早上喝一大杯热水',
          type: 1,
          status: 1
        },
        {
          date: '2020-10-13',
          taskTopic: '发呆',
          description: '每天晚上发呆自省',
          type: 2,
          status: 2
        },
        {
          date: '2020-10-14',
          taskTopic: '冥想',
          description: '修仙ing',
          type: 2,
          status: 1
        }
      ],
      pageControl: {
        dialogVisible: false,
        disable: false,
        selectDay: '2020-10-13',
        activeName: '-1'
      }
    }
  },
  created: function () {
    // let test = ''+this.getAllDates().toString();
    // console.info(test)
  },
  methods: {
    getAllDates () {
      let dates = ''
      let mytask = this.tasks
      // console.info('取个日期'+this.tasks[0].date);
      for (let i = 0; i < mytask.length; i++) {
        // dates.push(item.date);
        dates = dates + ' ' + mytask[i].date
        // console.info('单个日期'+ mytask[i].date);
      }
      console.info('所有日期' + dates)
      return dates
    },
    callDialog (selectedDay) {
      this.pageControl.dialogVisible = true
      this.pageControl.selectDay = selectedDay
    },
    newTask (selectedDay) {
      console.info('新增任务' + selectedDay)
    }
  }
}
</script>

<style scoped>

</style>
