<template>
  <div>
    <!--搜索-->
    <el-select v-model="pageControl.search.status" clearable size="mini" placeholder="请选择状态"
               style="width:110px; float:left">
      <el-option key="1" label="未开始" value="1"></el-option>
      <el-option key="2" label="进行中" value="2"></el-option>
      <el-option key="3" label="已完成" value="3"></el-option>
      <el-option key="4" label="已撤销" value="4"></el-option>
    </el-select>
    <el-input placeholder="请输入名称" clearable size="mini" v-model="pageControl.search.name"
              style="width:200px; float:left"></el-input>
    <el-button icon="el-icon-search" type="primary" @click="queryFlagList(1)" size="mini"></el-button>
    <!--新增-->
    <el-button type="primary" @click="pageControl.visible = true" size="mini" style="float:right">
      {{ getCreateTitle() }}
    </el-button>
    <el-dialog :visible.sync="pageControl.visible">
      <template #title>
        <span>{{ getCreateTitle() }}</span>
      </template>
      <div>
        <el-input placeholder="请输入名称" suffix-icon="el-icon-s-flag" v-model="pageControl.newFlagName"></el-input>
      </div>
      <template #footer class="dialog-footer">
        <div>
          <el-button @click="pageControl.visible = false">取 消</el-button>
          <el-button type="primary" @click="newFlag">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--列表-->
    <el-table :data="pageData" border size="mini">
      <el-table-column label="状态" width="80">
        <template #default="scope">
          <el-tag size="small" :type="getTagType(scope.row)">{{ getStatus(scope.row) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="flagName" label="名称" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="简介" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="witnessName" label="见证人" width="100"></el-table-column>
      <el-table-column label="优先级" width="100">
        <template #default="scope">
          {{ getPriority(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间" width="150"></el-table-column>
      <el-table-column prop="expected" label="预期结果"></el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template #default="scope">
          <!--1=未开始，2=进行中，3=已完成，4=已撤销-->
          <span v-if="scope.row.status === 1">
            <el-button @click="$router.push(`flagDetail/${scope.row.flagId}`)" type="text" size="small">编辑</el-button>
            <el-popconfirm title="确定删除Flag吗？" @confirm="removeFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
          <span v-else-if="scope.row.status === 2">
            <el-button @click="$router.push(`flagDetail/${scope.row.flagId}`)" type="text" size="small">编辑</el-button>
            <el-popconfirm title="确定Flag已完成吗？" @confirm="completeFlag(scope.row)">
                <template #reference>
                  <el-button type="text" size="small">完成</el-button>
                </template>
            </el-popconfirm>
          </span>
          <span v-else-if="scope.row.status === 3">
            <el-button @click="$router.push(`flagDetail/${scope.row.flagId}`)" type="text" size="small">查看</el-button>
          </span>
          <span v-else-if="scope.row.status === 4">
            <el-popconfirm title="确定恢复Flag吗？" @confirm="restoreFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">恢复</el-button>
              </template>
            </el-popconfirm>
          </span>
          <span v-else>
            <el-popconfirm title="确定删除Flag吗？" @confirm="removeFlag(scope.row)">
              <template #reference>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="prev, pager, next" @current-change="queryFlagList" :current-page="pageControl.pageIndex"
                   :total="1000" style="float: right">
    </el-pagination>
  </div>

</template>

<script>
import {modifyFlagStatusAPI, queryFlagListAPI, newFlagAPI} from '@/api/flag'

export default {
  props: {
    flagType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageData: [],
      pageControl: {
        pageIndex: 1,
        visible: false,
        newFlagName: '',
        // currentPage: 1,
        search: {
          status: '',
          name: null
        }
      }
    }
  },
  created: function () {
    this.queryFlagList(1)
  },
  methods: {
    changeCurrentPage(val) {
      this.pageControl.pageIndex = val
      this.queryFlagList()
      // console.info('this page=' + this.pageControl.currentPage)
      console.info('this page2=' + val)
    },
    newFlag() {
      newFlagAPI({
        flagName: this.pageControl.newFlagName,
        type: this.flagType
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增成功')
          this.queryFlagList()
          this.pageControl.visible = false
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    queryFlagList(currentPage) {
      this.pageControl.pageIndex = currentPage
      queryFlagListAPI({
        flagName: this.pageControl.search.name,
        type: this.flagType, // 1--flag, 2--习惯
        pageIndex: this.pageControl.pageIndex
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    },
    removeFlag(row) {
      console.info(row)
      console.info('test' + this.pageData.length)
    },
    restoreFlag(row) {
      modifyFlagStatusAPI({
        flagId: row.flagId,
        status: 4
      }).then(response => {
        if (response.data.success === true) {
          this.queryFlagList()
        }
      })
    },
    completeFlag(row) {
      modifyFlagStatusAPI({
        flagId: row.flagId,
        status: 3
      }).then(response => {
        if (response.data.success === true) {
          this.queryFlagList()
        }
      })
    },
    getType(row) {
      let flagType = ''
      switch (row.type) {
        case 1:
          flagType = 'FLAG'
          break
        case 2:
          flagType = '习惯'
          break
      }
      return flagType
    },
    getPriority(row) {
      let flagPriority = ''
      switch (row.priority) {
        case 1:
          flagPriority = '普通'
          break
        case 2:
          flagPriority = '重要'
          break
        case 3:
          flagPriority = '非常重要'
          break
      }
      return flagPriority
    },
    getStatus(row) {
      let flagStatus = ''
      switch (row.status) {
        case 1:
          flagStatus = '未开始'
          break
        case 2:
          flagStatus = '进行中'
          break
        case 3:
          flagStatus = '已完成'
          break
        case 4:
          flagStatus = '暂停'
          break
      }
      return flagStatus
    },
    getTagType(row) {
      let tagType = ''
      switch (row.status) {
        case 1:
          // 未开始
          tagType = 'info'
          break
        case 2:
          // 进行中
          tagType = '-'
          break
        case 3:
          // 已完成
          tagType = 'success'
          break
        case 4:
          // 暂时
          tagType = 'warning'
          break
      }
      return tagType
    },
    getCreateTitle() {
      if (this.flagType === 1) {
        return '新增FLAG'
      } else if (this.flagType === 2) {
        return '新增习惯'
      }
    }
  }
}
</script>

<style scoped>

</style>
