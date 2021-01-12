<template>
  <div>
    <div>
      <sapn>可用积分：{{pageData.pointSummary.usablePoint}}；  冻结积分：{{pageData.pointSummary.freezePoint}}</sapn>
      <el-button @click="pageControl.drawerVisible=true">使用积分</el-button>
    </div>
    <el-tabs tab-position="left">
      <el-tab-pane label="积分收入">
        <el-table :data="pageData.pointList" style="width: 100%">
          <el-table-column prop="description" label="收入来源" width="180">
          </el-table-column>
          <el-table-column prop="point" label="积分变化" width="180">
          </el-table-column>
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="comment" label="备注">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="积分使用">
        <el-table :data="pageData.pointList" style="width: 100%">
          <el-table-column prop="description" label="使用去向" width="180">
          </el-table-column>
          <el-table-column prop="point" label="积分变化" width="180">
          </el-table-column>
          <el-table-column prop="date" label="日期">
          </el-table-column>
          <el-table-column prop="comment" label="备注">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


    <el-drawer title="做点什么奖励自己吧，劳逸结合才是正道" :visible.sync="pageControl.drawerVisible" size="35%">
      <div class="block">
        <span class="demonstration">幻灯片</span>
        <el-carousel height="150px" :autoplay="false" trigger="click" type="card" arrow="never">
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: #42b983">
            购物
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: blue">
            <img src="../../assets/travel.jpg">
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: orange">
            自定义
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>
        <el-button @click="pageControl.innerDrawerVisible = true">购物</el-button>
        <el-button @click="pageControl.innerDrawerVisible = true">看片</el-button>
        <el-button @click="pageControl.innerDrawerVisible = true">游戏</el-button>
        <el-button @click="pageControl.innerDrawerVisible = true">旅行</el-button>
        <el-button @click="pageControl.innerDrawerVisible = true">自定义</el-button>
        <el-row @row-click="pageControl.innerDrawerVisible = true" style="background-color: aqua">test</el-row>
        <el-image :src="1"></el-image>
        <img src="../../assets/travel.jpg">
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="pageControl.innerDrawerVisible">
          <p>_(:зゝ∠)_</p>
        </el-drawer>
      </div>
    </el-drawer>

  </div>

</template>

<script>

export default {
  data () {
    return {
      pageData: {
        pointSummary: {
          pointId: '',
          usablePoint: 100,
          freezePoint: 0
        },
        pointList: [{
          description: 'description',
          point: 1,
          date: 'date',
          comment: 'comment',
        }]
      },
      pageControl: {
        drawerVisible: false,
        innerDrawerVisible: false,
        url: '/src/assets/travel.jpg',
        fit: 'fill',
        travel: '../../assets/logo.png'
      }
    }
  }
}
</script>

<style scoped>

</style>
