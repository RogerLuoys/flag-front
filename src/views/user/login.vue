<template>
  <div>
    <div style="display: flex;justify-content: center">
      <el-card style="width: 400px;">
        <template #header>
          <span>请先登录</span>
          <span style="float: right"><el-button type="text" @click="pageControl.registerDialogVisible = true">注册</el-button></span>
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
            <el-button type="text" size="mini" @click="$message.error('联系作者或再注册一个')" style="float: right">忘记密码？</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" type="primary" @click="doLogin">登录</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" @click="guestLogin">使用访客账号</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
    <el-dialog title="注册新用户" :visible.sync="pageControl.registerDialogVisible">
      <el-form :model="pageData" label-width="2cm">
        <el-form-item label="登录账号">
          <el-input v-model="pageData.loginName" placeholder="请输入数字或字母" size="small" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="pageData.password" placeholder="请输入数字或字母" size="small" maxlength="10" show-word-limit></el-input>
        </el-form-item>
        <div style="text-align: center">
          <el-button type="primary" @click="registerUser">注册</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {loginAPI, registerAPI} from '@/api/user'
import {queryPointSummaryAPI} from '@/api/point'

export default {
  data () {
    return {
      pageData: {
        userId: '',
        userName: '',
        loginName: 'guest',
        password: '123456'
      },
      pageControl: {
        remember: true,
        registerDialogVisible: false,
        testValue: 0
      }
    }
  },
  created: function () {
    this.$store.commit('setIsLogin', false)
  },
  destroyed: function () {
    if (this.$cookies.get('userId')) {
      this.$store.commit('setIsLogin', true)
    }
  },
  methods: {
    registerUser () {
      registerAPI({
        loginName: this.pageData.loginName,
        password: this.pageData.password
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('注册成功')
          this.pageControl.registerDialogVisible = false
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    setUserCookie () {
      this.$cookies.set('loginName', this.pageData.loginName)
      this.$cookies.set('password', this.pageData.password)
      this.$cookies.set('userId', this.pageData.userId)
    },
    getPointId () {
      queryPointSummaryAPI().then(response => {
        if (response.data.success === true) {
          this.$store.commit('setPointId', response.data.data.pointId)
        }
      })
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
          this.$store.commit('setUserName', this.pageData.userName)
          this.getPointId()
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
          this.pageData = response.data.data
          this.setUserCookie()
          this.$store.commit('setUserName', this.pageData.userName)
          this.getPointId()
          this.$router.push('/flag')
        } else {
          this.$message.error('账号或密码错误')
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
