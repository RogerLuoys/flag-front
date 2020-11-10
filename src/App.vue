<template>
  <div id="app">
    <el-container>
      <el-header height="60px" style="background-color: lightsteelblue">
        <el-col :span="20">
          <el-menu class="el-menu-vertical-demo" mode="horizontal" default-active="1" @open="handleOpen" @close="handleClose" style="background-color: lightsteelblue">

            <el-menu-item index="1" @click="$router.push('/flaglist')">
              <i class="el-icon-s-flag"></i>
              <span slot="title">Flag</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/tasklist')">
              <i class="el-icon-date"></i>
              <span slot="title">任务</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/templatelist')">
              <i class="el-icon-document-copy"></i>
              <span slot="title">模板</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/messagelist')">
              <i class="el-icon-message"></i>
              <span slot="title">消息</span>
            </el-menu-item>
            <el-menu-item index="5" @click="$router.push('/profile')">
              <i class="el-icon-user"></i>
              <span slot="title">我的</span>
            </el-menu-item>
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">测试</span>
              </template>
              <el-menu-item index="8-1">
                <div @click="$router.push('/myflag')">列表</div>
              </el-menu-item>
              <el-menu-item index="8-2">
                <div @click="$router.push('/flagdetail')">新建</div>
              </el-menu-item>
              <el-menu-item index="8-3">
                <div @click="$router.push('/mycreateflag')">新建任务</div>
              </el-menu-item>
              <el-menu-item index="8-4">
                <div @click="$router.push('/mycreateflag')">任务列表</div>
              </el-menu-item>
              <el-menu-item index="8-5">
                <div @click="$router.push('/mycreateflag')">任务日历</div>
              </el-menu-item>
            </el-submenu>
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
      <el-main style="height: 500px; background-color: whitesmoke">
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
</style>
