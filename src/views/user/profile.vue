<template>
  <el-container>
    <el-aside width="800px">
      <div>
        <h1>个人资料</h1>
      </div>
      <el-form ref="pageData" :model="pageData" label-width="3cm" style="max-width: 800px">
        <el-form-item label="用户ID">
          <el-input v-model="pageData.userId" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="pageData.loginName" size="small" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="pageData.password" size="small" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="pageData.userName" size="small" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="pageData.phone" size="small" maxlength="11"></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary">保存</el-button>
        </div>
      </el-form>
    </el-aside>
    <el-main style="background-color: lightgrey">
      <div>
        说明：<br/>完成FLAG，就可以获得“吃得香睡得稳玩得欢”BUFF，加油！<p/>
      </div>
      <div>备注</div>
      <div>1、这是一个兴趣使然的网站</div>
      <div>2、网站由个人完成，安全性和稳定性不高，比较脆弱</div>
      <div>3、可通过git查看项目代码</div>
      <div>&emsp;&emsp;git@github.com:RogerLuoys/flag-front.git</div>
      <div>&emsp;&emsp;git@github.com:RogerLuoys/flag-web.git</div>
      <div>&emsp;&emsp;git@github.com:RogerLuoys/flag.git</div>
      <div>4、任何问题可直接联系作者</div>
      <div>&emsp;&emsp;微信 13515743614（罗）</div>
      <div>&emsp;&emsp;邮箱 playerroger@163.com（不常用）</div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      pageData: {
        userId: '',
        loginName: '',
        password: '',
        userName: '',
        phone: '',
        type: ''
      }
    }
  },
  created: function () {
    this.queryUserProfile()
  },
  methods: {
    queryUserProfile () {
      console.info('profile')
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
