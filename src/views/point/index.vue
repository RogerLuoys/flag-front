<template>
  <div>
    <div>
      <sapn>今年积分总收入：{{pageData.pointSummary.totalPoint}}；    可用积分：{{pageData.pointSummary.usablePoint}}</sapn>
      <el-button @click="pageControl.drawerVisible=true">使用积分</el-button>
    </div>
    <el-tabs tab-position="left" v-model="pageControl.activateName" @tab-click="queryPointLogList">
      <el-tab-pane label="积分收入" name="income">
        <point-list :point-list="pageData.pointList" :type="1"></point-list>
      </el-tab-pane>
      <el-tab-pane label="积分使用" name="expend">
        <point-list :point-list="pageData.pointList" :type="2"></point-list>
      </el-tab-pane>
    </el-tabs>


    <el-drawer :title="pageControl.title" :visible.sync="pageControl.drawerVisible" size="35%">
      <div class="block">
        <el-carousel height="120px" :autoplay="false" trigger="click" type="card" arrow="never">
          <el-carousel-item @click="pageControl.innerDrawerVisible = true">
            <el-image :src="pageControl.customize" :fit="pageControl.fit" @click="changeCarousel(0)"></el-image>
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true">
            <el-image :src="pageControl.shopping" :fit="pageControl.fit" @click="changeCarousel(1)"></el-image>
          </el-carousel-item>
          <el-carousel-item @click="pageControl.innerDrawerVisible = true">
            <el-image :src="pageControl.travel" :fit="pageControl.fit" @click="changeCarousel(2)"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-if="pageControl.selectedCarousel === 0">
        <customize-point :point-id="this.pageData.pointSummary.pointId"></customize-point>
      </div>
      <div v-else-if="pageControl.selectedCarousel === 1">
        <div>待实现</div>
        <div>
          <el-link type="success">天猫商城</el-link>
          <el-input-number size="mini" v-model="pageControl.point"></el-input-number>
        </div>
        <el-link type="success">淘宝商城</el-link>
        <el-link type="success">京东商城</el-link>
        <el-link type="success">网易严选</el-link>
        <el-link type="success">拼多多</el-link>
        <el-link type="success">唯品会</el-link>
        <el-link type="success">线下商场</el-link>
      </div>
      <div v-else-if="pageControl.selectedCarousel === 2">
        待实现
      </div>
      <div v-else>
        页面异常，请联系管理员
      </div>
    </el-drawer>

  </div>

</template>

<script>
import customizePoint from './customize-point'
import pointList from './point-list'
import {queryPointSummaryAPI, queryPointLogListAPI} from '@/api/point'

export default {
  components: {customizePoint, pointList},
  data () {
    return {
      pageData: {
        pointSummary: {
          pointId: '',
          totalPoint: 100,
          usablePoint: 100
        },
        pointList: [{
          description: 'description',
          point: 1,
          recordTime: 'date',
          comment: 'comment'
        }]
      },
      pageControl: {
        drawerVisible: false,
        activateName: 'income',
        pointUseType: 1,
        title: '劳逸结合，你的积分你做主',
        selectedCarousel: 0,
        point: 1,
        fit: 'fit',
        travel: 'http://118.24.117.181/images/travel.jpg',
        shopping: 'http://118.24.117.181/images/shopping.jpg',
        game: 'http://118.24.117.181/images/game.jpg',
        customize: 'http://118.24.117.181/images/customize.jpg'
      }
    }
  },
  created: function () {
    this.queryPointSummary()
  },
  methods: {
    changeCarousel (item) {
      switch (item) {
        case 0:
          this.pageControl.title = '劳逸结合，你的积分你做主'
          break
        case 1:
          this.pageControl.title = '不用剁手的买买买'
          break
        case 2:
          this.pageControl.title = '把心事留在书山学海，带身躯飘向碧水蓝天'
          break
      }
      this.pageControl.selectedCarousel = item
      console.info('点击成功' + this.pageControl.selectedCarousel)
    },
    queryPointSummary () {
      queryPointSummaryAPI().then(response => {
        if (response.data.success === true) {
          this.pageData.pointSummary = response.data.data
        }
      })
    },
    queryPointLogList () {
      if (this.pageControl.activateName === 'income') {
        this.pageControl.pointUseType = 1
      } else if (this.pageControl.activateName === 'expend') {
        this.pageControl.pointUseType = 2
      }
      console.info(this.pageControl.activateName)
      queryPointLogListAPI({
        pointId: this.pageData.pointSummary.pointId,
        type: this.pageControl.pointUseType
      }).then(response => {
        if (response.data.success === true) {
          this.pageData.pointList = response.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
