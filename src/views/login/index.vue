<template>
  <div>
    <div style="display: flex;justify-content: center;margin-top: 90px">
      <el-card style="width: 400px;">
        <template #header>
          <span>请先登录</span>
          <el-button type="text" size="medium">注册</el-button>
        </template>
        <div>
          <el-row>
            <el-input v-model="pageData.username" placeholder="请输入账号或手机号"></el-input>
          </el-row>
          <el-row>
            <el-input v-model="pageData.password" type="password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
          </el-row>
          <el-row>
            <el-checkbox v-model="pageControl.remember">记住密码</el-checkbox>
            <el-button type="text" size="mini">忘记密码？</el-button>
          </el-row>
          <el-row>
            <el-button style="width: 360px" type="primary" @click="doLogin">登录</el-button>
            <el-button type="primary" @click="testMethod">测试</el-button>
          </el-row>
          <div>测试数据：{{pageControl.testValue}}</div>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import store from "../../store/test-vuex";

export default {
  data () {
    return {
      pageData: {
        username: 'tester',
        password: '123456'
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
      console.info('测试vuex' + this.$store.state.count)
      console.info('test vuex' + this.$store.state.dialogDisable)
    },
    doLogin () {
      const _username = this.user.username
      const _passwd = this.user.password
      const _this = this
      axios.get('api/login/login', {
        params: {
          accountId: _username,
          passwd: _passwd
        }
      }).then(function (response) {
        console.log(response.data)
        // this.$router.push('/');
        _this.$router.push('/')
        // debugger;
      })
    }
  }
}
</script>

<style scoped>
  /*.el-row {*/
  /*margin-bottom: 20px;*/
  /*&:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/
  /*}*/
</style>
