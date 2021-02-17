<template>
  <el-form ref="pageData" :model="pageData" label-width="2cm">
    <el-form-item label="使用说明">
      <el-input v-model="pageData.description" placeholder="记录点啥以免忘记" type="textarea" maxlength="200" style="width: 9cm"></el-input>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="pageData.comment" placeholder="随便写写"  type="textarea" maxlength="200" style="width: 9cm"></el-input>
    </el-form-item>
    <el-form-item label="积分">
      <el-input-number size="mini" v-model="pageData.point"></el-input-number>
    </el-form-item>
    <div style="text-align: center">
      <el-popconfirm title="注意使用后积分扣减的积分无法撤销，确定吗？" @confirm="newPointLog">
        <template #reference>
          <el-button type="primary" size="small">自定义使用</el-button>
        </template>
      </el-popconfirm>
    </div>
  </el-form>
</template>

<script>
import {newPointLogAPI} from '@/api/point'

export default {
  props: {
    pointId: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      pageData: {
        description: '',
        comment: '',
        point: 0
      }
    }
  },
  methods: {
    newPointLog () {
      newPointLogAPI({
        pointId: this.pointId,
        description: this.pageData.description,
        comment: this.pageData.comment,
        point: this.pageData.point,
        type: 2
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('新增使用记录成功')
          this.$store.commit('incrementExpendPointCount')
        } else {
          this.$message.error('新增使用记录失败')
        }
      })
      // this.$message.success('记录成功，放飞自我去吧')
    }
  }
}
</script>

<style scoped>

</style>
