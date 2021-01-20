<template>
  <el-table :data="flagList" border size="mini">
    <el-table-column prop="flagName" label="名称" width="150"></el-table-column>
    <el-table-column prop="description" label="简介" width="300"></el-table-column>
    <el-table-column prop="witnessName" label="见证人" width="100"></el-table-column>
<!--    <el-table-column label="类型" width="100">-->
<!--      <template #default="scope">-->
<!--        {{getType(scope.row)}}-->
<!--      </template>-->
<!--    </el-table-column>-->
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
    <el-table-column prop="description" label="预期结果"></el-table-column>
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
</template>

<script>
import {modifyFlagStatusAPI} from '@/api/flag'

export default {
  props: {
    flagList: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageData: {

      }
    }
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
          // this.queryFlagList()
        }
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

</style>
