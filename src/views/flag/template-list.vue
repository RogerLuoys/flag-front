<template>
  <div>
    <el-table :data="pageData" border size="mini" style="width: 100%">
      <el-table-column prop="flagName" label="名称" width="150"></el-table-column>
      <el-table-column prop="useCount" label="使用度" width="100"></el-table-column>
      <el-table-column label="类型" width="100">
        <template #default="scope">
          {{getType(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column prop="description" label="简介" width="300"></el-table-column>
      <el-table-column prop="expected" label="预期结果"></el-table-column>
      <el-table-column fixed="right" label="操作" width="90">
        <template #default="scope">
          <el-button @click="$router.push(`templateDetail/${scope.row.flagTemplateId}`)"  type="text" size="small" >查看</el-button>
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
import {queryFlagTemplateListAPI} from '@/api/template'

export default {
  // props: {
  //   templateList: {
  //     type: Array,
  //     default: () => []
  //   },
  //   type: {
  //     type: Number,
  //     default: 1
  //   }
  // },
  data () {
    return {
      pageData: [{
        flagTemplateId: '2',
        flagName: '--',
        useCount: '1',
        description: '--',
        type: '1',
        expected: '--'
      }],
      pageControl: {
        search: {
          name: null
        }
      }
    }
  },
  created: function () {
    console.info('test template')
    this.queryFlagTemplateList()
  },
  methods: {
    queryFlagTemplateList () {
      queryFlagTemplateListAPI({
        flagName: this.pageControl.flagType
      }).then(response => {
        this.pageData = response.data.data
      })
    },
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
