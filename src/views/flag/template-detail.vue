<template>
  <div>
    <el-page-header @back="$router.push('/flag')" content="FLAG模板" title="返回列表"></el-page-header>
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
          <el-table-column prop="description" label="简介" width="150"></el-table-column>
          <el-table-column prop="point" label="积分" width="150"></el-table-column>
          <el-table-column prop="cycle" label="周期" width="150"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import {queryFlagTemplateDetailAPI} from '@/api/template'

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
        taskTemplateList: [
          {
            taskTemplateId: 'taskTemplateId',
            taskName: 'taskName',
            description: 'description',
            point: 'point',
            type: 'type',
            taskType: 'type',
            cycle: 'cycle'
          }
        ]
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
