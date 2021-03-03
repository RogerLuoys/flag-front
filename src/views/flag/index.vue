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
  methods: {
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
