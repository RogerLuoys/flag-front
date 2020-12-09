<template>
  <div>
    <el-page-header @back="$router.push('/flag')" content="FLAG详情" title="返回列表"></el-page-header>
    <el-divider content-position="right">
      <span>更改Flag状态：</span>
      <el-button type="text" size="small">完成</el-button>
      <el-button type="text" size="small">暂停</el-button>
      <el-button type="text" size="small">删除</el-button>
      <el-button type="text" size="small">还原</el-button>
    </el-divider>
    <el-collapse v-model="pageControl.activeNames" @change="handleChange">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="pageData" :model="pageData" label-width="5cm" style="max-width: 1000px">
          <el-form-item>
            <el-button type="primary" @click="modifyFlagBasic"  size="small">保存</el-button>
          </el-form-item>
          <el-form-item label="业务ID：">
            <el-input v-model="pageData.flagId" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称：">
            <el-input v-model="pageData.flagName" size="small" maxlength="30" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-radio-group v-model="pageData.type"  size="small">
              <el-radio :label="'1'">FLAG</el-radio>
              <el-radio :label="'2'">习惯</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开始时间：">
            <el-date-picker type="date" placeholder="选择日期" v-model="pageData.startDate"  size="small" style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker type="date" placeholder="选择日期" v-model="pageData.endDate"  size="small" style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="优先级：">
            <el-select v-model="pageData.priority" placeholder="请选择"  size="small" style="width: 200px">
              <el-option v-for="item in pageControl.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述：">
            <el-input v-model="pageData.description" type="textarea" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="期望目标：">
            <el-input v-model="pageData.expected" type="textarea" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="实际成果：">
            <el-input v-model="pageData.actual" type="textarea" maxlength="200" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="见证人" name="2">
        <div>见证人是：{{pageData.witnessName}}</div>
      </el-collapse-item>
      <el-collapse-item title="任务列表" name="3">
        <el-button type="text" size="small" @click="pageControl.dialogVisible = true">点我新增关联任务</el-button>
        <el-table :data="pageData.tasks" style="margin-left: 100px">
          <el-table-column prop="taskName" label="名称" width="150"></el-table-column>
          <el-table-column prop="description" label="简介" width="150"></el-table-column>
          <el-table-column prop="point" label="积分" width="150"></el-table-column>
          <el-table-column prop="cycle" label="周期" width="150"></el-table-column>
          <el-table-column label="操作" width="150">
            <template v-slot="scope">
              <el-button @click="queryFlagDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="complete(scope.row)" type="text" size="small">完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <el-dialog :visible.sync="pageControl.dialogVisible">
      <task-detail></task-detail>
    </el-dialog>
  </div>
</template>

<script>
import {queryFlagDetailAPI, modifyFlagBasicAPI} from '@/api/flag'
import taskDetail from './task-detail'

export default {
  components: {taskDetail},
  data () {
    return {
      pageData: {
        flagId: 'flagId',
        flagName: 'flagName',
        type: '1',
        startDate: '2020-10-17',
        endDate: '2021-12-31',
        priority: '1',
        description: 'description',
        expected: 'expected',
        actual: 'actual',
        ownerId: 'ownerId',
        ownerName: 'ownerName',
        witnessId: 'witnessId',
        witnessName: 'witnessName',
        tasks: [
          {
            taskId: '',
            taskName: '',
            description: '',
            point: '',
            type: '',
            cycle: '',
            is_scanned: ''
          }
        ]
      },
      pageControl: {
        dialogVisible: false,
        activeNames: ['1'],
        options: [
          {
            value: '1',
            label: '一般'
          },
          {
            value: '2',
            label: '重要'
          },
          {
            value: '3',
            label: '非常重要'
          }
        ]
      }
    }
  },
  created: function () {
    this.queryFlagDetail()
  },
  methods: {
    queryFlagDetail () {
      queryFlagDetailAPI(
        this.$route.params.id
      ).then(response => {
        this.pageData = response.data.data
      })
    },
    modifyFlagBasic () {
      modifyFlagBasicAPI({
        flagId: this.pageData.flagId,
        flagName: this.pageData.flagName,
        type: this.pageData.type,
        startDate: this.pageData.startDate,
        endDate: this.pageData.endDate,
        priority: this.pageData.priority,
        description: this.pageData.description,
        expected: this.pageData.expected,
        actual: this.pageData.actual
      }).then(response => {
        if (response.data.success === true) {
          console.info('更新基本信息成功')
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
