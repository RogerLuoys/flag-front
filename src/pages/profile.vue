<template>
  <el-container>
    <el-aside width="800px" style="background-color: #D3DCE6">
      <el-row>
        <span>姓名：XXXXX</span>
        <el-button size="mini">修改</el-button>
      </el-row>
      <el-row>
        账号：XXXXX
      </el-row>
      <el-row>
        手机号：XXXXX
      </el-row>
      <el-row>
        密码：XXXXX
      </el-row>
      <el-row>
        权限：XXXXX
      </el-row>
      <el-row>
        积分：XXXXX
      </el-row>
      <el-row>
        报表：年度FLAG完成情况、查看报表、下载报表、分享链接
      </el-row>
    </el-aside>
    <el-main>
      <div>积分</div>
      <div>可用积分：99999</div>
      <div>使用、去商城</div>
      <div v-for="item in 20" :key="item">使用记录{{item}}：<br/>某时购买某某使用XX积分</div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: ''
}
</script>

<style scoped>

</style>
