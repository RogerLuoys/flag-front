<template>
  <div>
    <el-form :model="pageData" label-width="2cm">
      <el-form-item label="任务名：">
        <el-input v-model="pageData.taskName" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="积分：">
        <el-input-number v-model="pageData.point" controls-position="right" size="small" :min="0" :max="100"></el-input-number>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="pageData.type"  size="small">
          <el-radio label="按周循环"></el-radio>
          <el-radio label="按月循环"></el-radio>
          <el-radio label="临时任务"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="pageData.description" type="textarea" maxlength="200" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit"  size="small">保存且立即生成每日任务</el-button>
    <el-button type="primary" @click="onSubmit"  size="small">保存但暂不生成每日任务</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageData: {
        taskId: '',
        flagId: '',
        taskName: '',
        description: '',
        point: '',
        type: '',
        cycle: '',
        is_scanned: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
