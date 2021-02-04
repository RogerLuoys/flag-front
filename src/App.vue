<template>
  <div id="app">
    <el-container style="background-color: whitesmoke">
      <el-header v-if="$store.state.user.isLoginVisible === false" height="60px" style="background-color: whitesmoke">
        <el-col :span="23">
          <el-menu class="el-menu-vertical-demo" mode="horizontal" default-active="1" @open="handleOpen" @close="handleClose"
                   background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b">

            <el-menu-item index="1" @click="$router.push('/flag')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Flag</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/taskDaily')">
              <i class="el-icon-date"></i>
              <span slot="title">每日任务</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/report')">
              <i class="el-icon-notebook-1"></i>
              <span slot="title">成长轨迹</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/point')">
              <i class="el-icon-present"></i>
              <span slot="title">积分</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="1"  style="background-color: #545c64; height: 60px">
          <el-dropdown @command="dropdownAction">
            <el-avatar style="cursor: pointer">访客</el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人设置</el-dropdown-item>
              <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <el-header v-else height="60px" style="background-color: whitesmoke">
        <span>欢迎使用，有问题请联系作者</span>
      </el-header>
      <el-main style="height: 13cm; background-color: whitesmoke">
        <el-card style="min-height: 99%">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    testM (command) {
      console.info('test ' + command)
      this.$router.push('/')
    },
    dropdownAction (command) {
      switch (command) {
        case 'profile':
          this.$router.push('/profile')
          break
        case 'loginOut':
          this.$router.push('/')
          break
      }
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    color: #2c3e50;
  }
  .el-header {
    /*position: relative;*/
    /*width: 100%;*/
    /*height: 60px;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 999999;*/
    background-color: #FFFFFF;
  }
  /*.el-main {*/
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 60px;*/
    /*bottom: 0;*/
    /*overflow-y: scroll;*/
  /*}*/
</style>
