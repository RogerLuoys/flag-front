<template>
  <div>
    <el-row>
      <!--搜索-->
      <el-select v-model="pageControl.search.type" size="mini" placeholder="请选择" style="width:100px; float:left">
        <el-option key="1" label="Flag" value="1"></el-option>
        <el-option key="2" label="习惯" value="2"></el-option>
      </el-select>
      <el-input placeholder="请输入Flag名称" size="mini" v-model="pageControl.search.name" style="width:200px; float:left"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="queryFlagList" size="mini"></el-button>
      <!--新增-->
      <el-button type="primary" @click="pageControl.visible = true" size="mini" style="float:right">新增Flag</el-button>
      <el-dialog title="新增Flag" :visible.sync="pageControl.visible">
        <div>
          <el-input placeholder="请输入Flag名称" suffix-icon="el-icon-s-flag" v-model="pageControl.name"></el-input>
        </div>
        <template #footer class="dialog-footer">
          <div>
            <el-button @click="pageControl.visible = false">取 消</el-button>
            <el-button type="primary" @click="newFlag">确 定</el-button>
          </div>
        </template>
      </el-dialog>
    </el-row>
    <el-row>
      <!--列表-->
      <el-table :data="pageData" border size="mini" style="width: 100%">
        <el-table-column prop="flagId" label="业务ID" width="150"></el-table-column>
        <el-table-column prop="flagName" label="名称" width="150"></el-table-column>
        <el-table-column prop="description" label="简介" width="300"></el-table-column>
        <el-table-column prop="witnessName" label="见证人" width="100"></el-table-column>
        <el-table-column label="类型" width="100">
          <template #default="scope">
            {{getType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template #default="scope">
            {{getPriority(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="150"></el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            {{getStatus(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template #default="scope">
            <el-button @click="$router.push(`flagDetail/${scope.row.flagId}`)" type="text" size="small">编辑</el-button>
            <span v-if="scope.row.type === '1'">
              <el-popconfirm title="确定删除Flag吗？" @confirm="removeFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            </span>
            <span v-else-if="scope.row.type === '2'">
              <el-popconfirm title="确定Flag已完成吗？" @confirm="completeFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">完成</el-button>
              </template>
            </el-popconfirm>
            </span>
            <span v-else-if="scope.row.type === '3'"></span>
            <span v-else-if="scope.row.type === '4'">
              <el-popconfirm title="确定恢复Flag吗？" @confirm="restoreFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">恢复</el-button>
              </template>
            </el-popconfirm>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      style="float: right"
    >
    </el-pagination>
  </div>

</template>

<script>
import {queryFlagListAPI, newFlagAPI, modifyFlagStatusAPI} from '@/api/flag'

export default {
  data () {
    return {
      pageData: [{
        flagId: '2',
        flagName: '--',
        description: '--',
        witnessID: '--',
        witnessName: '--',
        type: '1',
        priority: '--',
        endDate: '--',
        status: '2'
      }],
      pageControl: {
        pageIndex: 1,
        visible: false,
        name: '',
        search: {
          type: '',
          name: ''
        }
      }
    }
  },
  created: function () {
    this.queryFlagList()
  },
  methods: {
    removeFlag (row) {
      console.info(row)
      console.info('test')
    },
    restoreFlag (row) {
      console.info(row)
      console.info('test')
    },
    completeFlag (row) {
      modifyFlagStatusAPI({
        flagId: row.flagId,
        status: '3'
      }).then(response => {
        if (response.data.success === true) {
          this.queryFlagList()
        }
      })
    },
    newFlag () {
      newFlagAPI({
        flagName: this.pageControl.name
      }).then(response => {
        if (response.data.success === true) {
          this.queryFlagList()
          this.pageControl.visible = false
        } else {
          console.info('添加失败')
        }
      })
    },
    queryFlagList () {
      queryFlagListAPI({
        pageIndex: this.pageControl.pageIndex
      }).then(response => {
        this.pageData = response.data.data
      })
    },
    getType (row) {
      let flagType = ''
      switch (row.type) {
        case '1':
          flagType = 'FLAG'
          break
        case '2':
          flagType = '习惯'
          break
      }
      return flagType
    },
    getPriority (row) {
      let flagPriority = ''
      switch (row.priority) {
        case '1':
          flagPriority = '普通'
          break
        case '2':
          flagPriority = '重要'
          break
        case '3':
          flagPriority = '非常重要'
          break
      }
      return flagPriority
    },
    getStatus (row) {
      let flagStatus = ''
      switch (row.status) {
        case '1':
          flagStatus = '未开始'
          break
        case '2':
          flagStatus = '进行中'
          break
        case '3':
          flagStatus = '已完成'
          break
        case '4':
          flagStatus = '暂停'
          break
      }
      return flagStatus
    }
  }
}
</script>

<style scoped>
  /*.el-row {*/
  /*margin-bottom: 2px;*/
  /*&:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/
  /*}*/
</style>
