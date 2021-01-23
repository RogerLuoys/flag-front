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
      <el-tabs tab-position="left" v-model="pageControl.activateName" @tab-click="queryFlagList">
        <el-tab-pane label="年度flag" name="flag">
          <flag-list :flag-list="pageData" :type="1"></flag-list>
        </el-tab-pane>
        <el-tab-pane label="终身flag" name="habit">
          <flag-list :flag-list="pageData" :type="2"></flag-list>
        </el-tab-pane>
        <el-tab-pane label="flag模板" name="template">
          <template-list></template-list>
        </el-tab-pane>
      </el-tabs>
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
import flagList from './flag-list'
import templateList from './template-list'

export default {
  components: {flagList, templateList},
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
        expected: '--',
        status: '2'
      }],
      pageControl: {
        pageIndex: 1,
        visible: false,
        activateName: 'flag',
        flagType: 1,
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
      if (this.pageControl.activateName === 'flag') {
        this.pageControl.flagType = 1
      } else if (this.pageControl.activateName === 'habit') {
        this.pageControl.flagType = 2
      }
      queryFlagListAPI({
        type: this.pageControl.flagType,
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
