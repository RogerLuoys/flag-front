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
          <el-popconfirm title="将使用该模板，确定吗？" @confirm="useTemplate(scope.row.flagTemplateId)">
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
import {queryFlagTemplateListAPI, useFlagTemplateAPI, queryFlagTemplateDetailAPI} from '@/api/template'

export default {
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
    useTemplate (templateId) {
      queryFlagTemplateDetailAPI(
        templateId
      ).then(response => {
        if (response.data.success === true) {
          let templateDetail = response.data.data
          useFlagTemplateAPI(templateDetail).then(response => {
            if (response.data.success === true) {
              this.$message.success('模板使用成功，请到对应列表查看')
            } else {
              this.$message.error('模板使用失败')
            }
          })
        } else {
          this.$message.error('模板使用失败')
        }
      })
    },
    getType (row) {
      let flagType = ''
      switch (row.flagType) {
        case 1:
          flagType = 'FLAG'
          break
        case 2:
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
