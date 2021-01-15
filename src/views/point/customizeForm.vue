<template>
  <el-form ref="pageData" :model="pageData" label-width="2cm">
    <el-form-item label="简介">
      <el-input v-model="pageData.expected" type="textarea" maxlength="200" style="width: 9cm"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="pageData.expected" type="textarea" maxlength="200" style="width: 9cm"></el-input>
    </el-form-item>
    <el-form-item label="积分">
      <el-input-number size="mini" v-model="pageControl.point"></el-input-number>
    </el-form-item>
    <div style="text-align: center">
      <el-button type="primary" size="small" @click="newPoint">确定</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      pageData: {
        description: '',
        comment: '',
        point: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
