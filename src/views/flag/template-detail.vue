<template>
  <div>
    <el-page-header @back="$router.push('/flag')" content="FLAG模板" title="返回列表">
      <template #content>
        <div style="text-align: right">
          <el-popconfirm title="将使用该模板，确定吗？" @confirm="useTemplate">
            <template #reference>
              <el-button size="mini" type="primary">使用该模板</el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-page-header>
    <el-divider content-position="right">
    </el-divider>
    <el-collapse v-model="pageControl.activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="pageData" :model="pageData" label-width="5cm" style="max-width: 1000px">
          <el-form-item label="名称">
            <el-input v-model="pageData.flagName" size="small" maxlength="30" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="pageData.type"  size="small" :disabled="true">
              <el-radio :label="1">FLAG</el-radio>
              <el-radio :label="2">习惯</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="pageData.description" type="textarea" maxlength="200" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="期望目标">
            <el-input v-model="pageData.expected" type="textarea" maxlength="200" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="任务列表" name="2">
        <el-table :data="pageData.taskTemplateList" style="margin-left: 100px">
          <el-table-column prop="taskName" label="名称" width="150"></el-table-column>
          <el-table-column prop="description" label="简介" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="point" label="积分" width="150"></el-table-column>
          <el-table-column label="周期" width="300">
            <template #default="scope">
              <el-tag v-for="(item, index) in getTaskCycle(scope.row)" :key="index">
                {{ item }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {queryFlagTemplateDetailAPI, useFlagTemplateAPI} from '@/api/template'

export default {
  data () {
    return {
      pageData: {
        flagTemplateId: 'flagTemplateId',
        flagName: 'flagName',
        type: 1,
        flagType: 1,
        description: 'description',
        expected: 'expected',
        taskTemplateList: []
      },
      pageControl: {
        activeNames: ['1', '2'],
        options: [
          {
            value: 1,
            label: '一般'
          },
          {
            value: 2,
            label: '重要'
          },
          {
            value: 3,
            label: '非常重要'
          }
        ]
      }
    }
  },
  created: function () {
    this.queryTemplateDetail()
  },
  methods: {
    useTemplate () {
      useFlagTemplateAPI(this.pageData).then(response => {
        if (response.data.success === true) {
          this.$message.success('模板使用成功，请到对应列表查看')
        } else {
          this.$message.error('模板使用失败')
        }
      })
    },
    getTaskCycle (row) {
      switch (row.taskType) {
        case 1:
          return '临时任务'
        case 2:
          return this.getWeekCycle(row.cycleList)
        default:
          return '未知周期'
      }
    },
    getWeekCycle (cycles) {
      let weekCycle = []
      for (let i = 0; i < cycles.length; i++) {
        weekCycle[i] = weekCycle + ' ' + cycles[i]
        // 转换成文字周期
        switch (cycles[i]) {
          case '1':
            weekCycle[i] = '周一'
            break
          case '2':
            weekCycle[i] = '周二'
            break
          case '3':
            weekCycle[i] = '周三'
            break
          case '4':
            weekCycle[i] = '周四'
            break
          case '5':
            weekCycle[i] = '周五'
            break
          case '6':
            weekCycle[i] = '周六'
            break
          case '7':
            weekCycle[i] = '周日'
            break
          default:
            weekCycle[i] = '未知周期'
            break
        }
      }
      return weekCycle
    },
    queryTemplateDetail () {
      queryFlagTemplateDetailAPI(
        this.$route.params.id
      ).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 500px;
}
</style>
