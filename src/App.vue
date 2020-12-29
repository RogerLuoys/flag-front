<template>
  <div id="app">
    <el-container>
      <el-header height="60px" style="background-color: lightsteelblu;">
        <el-col :span="20">
          <el-menu class="el-menu-vertical-demo" mode="horizontal" default-active="1" @open="handleOpen" @close="handleClose" style="background-color: lightsteelblue">

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
            <el-menu-item index="4" @click="$router.push('/message')">
              <i class="el-icon-trophy"></i>
              <span slot="title">排行榜</span>
            </el-menu-item>
            <el-menu-item index="5" @click="$router.push('/profile')">
              <i class="el-icon-user"></i>
              <span slot="title">我的</span>
            </el-menu-item>
            <el-submenu index="9">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">其它</span>
              </template>
              <el-menu-item-group>
                <span slot="title">工具集</span>
                <el-menu-item index="9-1">用例分析</el-menu-item>
                <el-menu-item index="9-2">环境管理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="代账会员">
                <el-menu-item index="9-3">代账管理</el-menu-item>
                <el-menu-item index="9-4">会员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col :span="4"  style="text-align: right; background-color: lightsteelblue; height: 60px">
          <el-button type="text" @click="$router.push('/login')">登录/注册</el-button>
        </el-col>

      </el-header>
      <el-main style="min-height: 10cm; background-color: whitesmoke">
        <el-card style="min-height: 99%">
          <router-view></router-view>
        </el-card>

      </el-main>
      <!--<el-container>-->
      <!---->
      <!--</el-container>-->

    </el-container>
    <!--<router-view/>-->
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
