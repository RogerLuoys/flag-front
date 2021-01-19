<template>
  <el-table :data="pointList" style="width: 100%">
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
export default {
  props: {
    pointList: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>

</style>
