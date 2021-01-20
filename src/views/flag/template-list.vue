<template>
  <div>
    <el-table :data="templateList" border size="mini" style="width: 100%">
      <el-table-column prop="flagName" label="推荐" width="100"></el-table-column>
      <el-table-column prop="flagName" label="名称" width="150"></el-table-column>
      <el-table-column label="类型" width="100">
        <template #default="scope">
          {{getType(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="简介" width="300"></el-table-column>
      <el-table-column prop="description" label="预期结果"></el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template #default="scope">
          <el-button @click="lookTemplate" type="text" size="small">查看</el-button>
          <el-popconfirm title="将使用该模板创建Flag，确定吗？" @confirm="useTemplate">
            <template #reference>
              <el-button type="text" size="small">使用</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    templateList: {
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
      }]
    }
  },
  created: function () {
    console.info('test template')
  },
  methods: {
    lookTemplate (row) {
      console.info(row)
      console.info('test look')
    },
    useTemplate (row) {
      console.info(row)
      console.info('test use')
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
    }
  }
}
</script>

<style scoped>

</style>
