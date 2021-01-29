<template>
  <div>
    <el-tabs tab-position="left" v-model="pageControl.activateName">
      <el-tab-pane label="年度flag" name="flag" :key="1">
        <flag-list :flag-type="1"></flag-list>
      </el-tab-pane>
      <el-tab-pane label="习惯养成" name="habit" :key="2">
        <flag-list :flag-type="2"></flag-list>
      </el-tab-pane>
      <el-tab-pane label="flag模板" name="template" :key="3">
        <template-list></template-list>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import flagList from './flag-list'
import templateList from './template-list'

export default {
  components: {flagList, templateList},
  data () {
    return {
      pageData: [{
        flagId: '2',
        flagName: '--',
        description: '--',
        witnessID: '--',
        witnessName: '--',
        type: '1',
        priority: '--',
        endDate: '--',
        expected: '--',
        status: '2'
      }],
      pageControl: {
        pageIndex: 1,
        visible: false,
        activateName: 'flag',
        flagType: 1,
        name: '',
        search: {
          type: '',
          name: ''
        }
      }
    }
  },
  // created: function () {
  //   this.queryFlagList()
  // },
  methods: {
    // removeFlag (row) {
    //   console.info(row)
    //   console.info('test')
    // },
    // restoreFlag (row) {
    //   console.info(row)
    //   console.info('test')
    // },
    // completeFlag (row) {
    //   modifyFlagStatusAPI({
    //     flagId: row.flagId,
    //     status: '3'
    //   }).then(response => {
    //     if (response.data.success === true) {
    //       this.queryFlagList()
    //     }
    //   })
    // },
    // queryFlagList () {
    //   if (this.pageControl.activateName === 'flag') {
    //     this.pageControl.flagType = 1
    //   } else if (this.pageControl.activateName === 'habit') {
    //     this.pageControl.flagType = 2
    //   }
    //   queryFlagListAPI({
    //     type: this.pageControl.flagType,
    //     pageIndex: this.pageControl.pageIndex
    //   }).then(response => {
    //     this.pageData = response.data.data
    //   })
    // },
    // getType (row) {
    //   let flagType = ''
    //   switch (row.type) {
    //     case '1':
    //       flagType = 'FLAG'
    //       break
    //     case '2':
    //       flagType = '习惯'
    //       break
    //   }
    //   return flagType
    // },
    // getPriority (row) {
    //   let flagPriority = ''
    //   switch (row.priority) {
    //     case '1':
    //       flagPriority = '普通'
    //       break
    //     case '2':
    //       flagPriority = '重要'
    //       break
    //     case '3':
    //       flagPriority = '非常重要'
    //       break
    //   }
    //   return flagPriority
    // },
    // getStatus (row) {
    //   let flagStatus = ''
    //   switch (row.status) {
    //     case '1':
    //       flagStatus = '未开始'
    //       break
    //     case '2':
    //       flagStatus = '进行中'
    //       break
    //     case '3':
    //       flagStatus = '已完成'
    //       break
    //     case '4':
    //       flagStatus = '暂停'
    //       break
    //   }
    //   return flagStatus
    // }
  }
}
</script>

<style scoped>
  /*.el-row {*/
  /*margin-bottom: 2px;*/
  /*&:last-child {*/
  /*margin-bottom: 0;*/
  /*}*/
  /*}*/
</style>
