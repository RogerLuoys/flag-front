<template>
  <el-table border :data="pageData" style="width: 100%">
    <template v-if="type === 1">
      <el-table-column prop="description" label="收入来源" width="180">
      </el-table-column>
    </template>
    <template v-else-if="type === 2">
      <el-table-column prop="description" label="使用说明" width="180">
      </el-table-column>
    </template>
    <el-table-column prop="point" label="积分变化" width="180">
    </el-table-column>
    <el-table-column prop="recordTime" label="日期">
    </el-table-column>
    <el-table-column prop="comment" label="备注">
    </el-table-column>
  </el-table>
</template>

<script>
import {queryPointLogListAPI} from '@/api/point'

export default {
  props: {
    pointId: {
      type: String,
      default: '0'
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pageData: []
    }
  },
  created: function () {
    console.info('point id = ' + this.pointId)
    this.queryPointLogList()
  },
  watch: {
    '$store.state.point.expendPointCount': function (newVal, oldVal) {
      if (this.type === 2) {
        this.queryPointLogList()
      }
    }
  },
  methods: {
    queryPointLogList () {
      queryPointLogListAPI({
        pointId: this.$store.state.point.pointId,
        type: this.type
      }).then(response => {
        if (response.data.success === true) {
          this.pageData = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
