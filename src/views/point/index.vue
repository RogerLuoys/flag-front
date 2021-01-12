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
        <el-carousel height="120px" :autoplay="false" trigger="click" type="card" arrow="never">
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: #42b983">
            <el-image :src="pageControl.shopping" :fit="pageControl.fit"></el-image>
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: blue">
            <el-image :src="pageControl.travel" :fit="pageControl.fit"></el-image>
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true" style="background-color: orange">
            <el-image :src="pageControl.customize" :fit="pageControl.fit"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div>


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
        fit: 'fit',
        travel: 'http://118.24.117.181/images/travel.jpg',
        shopping: 'http://118.24.117.181/images/shopping.jpg',
        game: 'http://118.24.117.181/images/game.jpg',
        customize: 'http://118.24.117.181/images/customize.jpg'
      }
    }
  }
}
</script>

<style scoped>

</style>
