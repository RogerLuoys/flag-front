<template>
  <div>
    <div style="display: flex;justify-content: center">
      <el-card style="width: 400px;">
        <template #header>
          <span>请先登录</span>
          <span style="float: right"><el-button type="text">注册</el-button></span>
        </template>
        <div>
          <el-row>
            <el-input v-model="pageData.loginName" placeholder="请输入账号"></el-input>
          </el-row>
          <el-row>
            <el-input v-model="pageData.password" type="password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
          </el-row>
          <el-row>
            <el-checkbox v-model="pageControl.remember" disabled>自动登录</el-checkbox>
            <el-button type="text" size="mini" style="float: right">忘记密码？</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" type="primary" @click="doLogin">登录</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" @click="guestLogin">使用访客账号</el-button>
          </el-row>
<!--          <el-button @click="testMethod">test</el-button>-->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {loginAPI, registerAPI} from '@/api/user'

export default {
  data () {
    return {
      pageData: {
        userId: '',
        userName: '',
        loginName: '',
        password: ''
      },
      pageControl: {
        remember: true,
        testValue: 0
      }
    }
  },
  methods: {
    testMethod () {
      // this.$store.
      this.$cookies.set('loginName', this.pageData.loginName)
      this.$cookies.set('password', this.pageData.password)
      this.$cookies.set('userId', '1')
    },
    setUserCookie () {
      this.$cookies.set('loginName', this.pageData.loginName)
      this.$cookies.set('password', this.pageData.password)
      this.$cookies.set('userId', this.pageData.userId)
    },
    guestLogin () {
      loginAPI({
        loginName: 'guest',
        password: '123456'
      }).then(response => {
        if (response.data.success === true) {
          console.info('登录成功')
          this.pageData = response.data.data
          this.setUserCookie()
          this.$router.push('/flag')
        }
      })
    },
    doLogin () {
      loginAPI({
        loginName: this.pageData.loginName,
        password: this.pageData.password
      }).then(response => {
        if (response.data.success === true) {
          console.info('登录成功')
          this.pageData = response.data.data
          this.setUserCookie()
          this.$router.push('/flag')
        } else {
          this.$message.error('账号密码不存在')
        }
      })
    }
  }
}
</script>

<style scoped>
.el-row {
margin-bottom: 20px;
&:last-child {
margin-bottom: 0;
}
}
</style>
