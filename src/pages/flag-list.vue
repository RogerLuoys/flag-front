<template>
  <div>
    <el-row>
      <el-select v-model="pageControl.search.type" size="mini" placeholder="请选择" style="width:100px; float:left">
        <el-option key="1" label="Flag" value="1"></el-option>
        <el-option key="2" label="习惯" value="2"></el-option>
      </el-select>
      <el-input placeholder="请输入内容" suffix-icon="el-icon-search" size="mini" v-model="pageControl.search.name" style="width:200px; float:left"></el-input>
      <el-button type="primary" @click="pageControl.visible = true" size="mini" style="float:right">新增Flag</el-button>
      <el-dialog title="新增Flag" :visible.sync="pageControl.visible">
        <div>
          <el-input placeholder="请输入Flag名称" suffix-icon="el-icon-s-flag" v-model="pageControl.name"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="pageControl.visible = false">取 消</el-button>
          <el-button type="primary" @click="newFlag()">确 定</el-button>
        </div>
      </el-dialog>
    </el-row>
    <el-row>
      <el-table :data="pageData" border size="mini" style="width: 100%">
        <el-table-column prop="flagId" label="业务ID" width="150"></el-table-column>
        <el-table-column prop="flagName" label="名称" width="150"></el-table-column>
        <el-table-column prop="description" label="简介" width="300"></el-table-column>
        <el-table-column prop="witnessName" label="见证人" width="100"></el-table-column>
        <el-table-column label="类型" width="100">
          <template #default="scope">
            {{getType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="100">
          <template #default="scope">
            {{getPriority(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="结束时间" width="150"></el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="scope">
            {{getStatus(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="90">
          <template #default="scope">
            <el-button @click="$router.push(`flagdetail/${scope.row.flagId}`)" type="text" size="small">查看</el-button>
            <el-button @click="complete(scope.row)" type="text" size="small">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      style="float: right"
    >
    </el-pagination>
  </div>

</template>

<script>
import axios from 'axios'

export default {
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
        status: '2'
      }],
      pageControl: {
        visible: false,
        name: '',
        search: {
          type: '',
          name: ''
        }
      }
    }
  },
  created: function () {
    this.getFlags()
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    queryDetail (row) {
      const _id = row.flagId
      const _this = this
      _this.$router.push({path: `/flagdetail/${_id}`})
      // console.log(row);
    },
    complete (row) {
      console.log(row)
      this.$confirm('确认已完成？')
        .then(_ => {
          this.done()
        })
        .catch(_ => {})
    },
    newFlag () {
      console.log(this.pageControl.name)
      const _this = this
      axios.post('api/api/flag/addFlag', {
        flagName: _this.pageControl.name
      }).then(function (response) {
        console.log(response.data)
        if (response.data.success === true) {
          _this.getFlags()
          _this.pageControl.visible = false
          // console.log("成功");
        } else {
          // console.log("失败");
        }
      })
      // this.pageControl.visible = false;
    },
    getFlags () {
      let _userId = '1'
      // const _passwd = this.user.password;
      const _this = this
      axios.get('api/api/flag/queryFlags', {
        params: {
          userId: _userId
          // passwd: _passwd
        }
      }).then(function (response) {
        // console.log(response.data);
        // console.log(response.data.data);
        _this.pageData = response.data.data
        // response.d
        // debugger;
      })
    },
    getType (row) {
      let flagType = ''
      switch (row.type) {
        case '1':
          flagType = 'FLAG'
          break
        case '2':
          flagType = '习惯'
          break
      }
      return flagType
    },
    getPriority (row) {
      let flagPriority = ''
      switch (row.priority) {
        case '1':
          flagPriority = '普通'
          break
        case '2':
          flagPriority = '重要'
          break
        case '3':
          flagPriority = '非常重要'
          break
      }
      return flagPriority
    },
    getStatus (row) {
      let flagStatus = ''
      switch (row.status) {
        case '1':
          flagStatus = '未开始'
          break
        case '2':
          flagStatus = '进行中'
          break
        case '3':
          flagStatus = '已完成'
          break
        case '4':
          flagStatus = '暂停'
          break
      }
      return flagStatus
    }
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
