<template>
  <div>
    <el-page-header @back="$router.push('/flag')" title="返回列表">
      <template #content>
        <span>{{pageData.flagName}}详情</span>
        <el-tag size="small" :type="getTagType(pageData.status)">{{ getStatus(pageData.status) }}</el-tag>
      </template>
    </el-page-header>
    <el-divider content-position="right">
      <span v-if="pageData.status === 1">
        <span>更改状态：</span>
        <el-popconfirm title="确定开始执行吗？" @confirm="startFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">开始</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="确定删除吗？" @confirm="removeFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
      <span v-else-if="pageData.status === 2">
        <span>更改状态：</span>
        <el-popconfirm title="确定已完成吗？" @confirm="completeFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">完成</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="确定暂停吗？" @confirm="pauseFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">暂停</el-button>
          </template>
        </el-popconfirm>
      </span>
      <span v-else-if="pageData.status === 3">
        <span>很棒，插会腰</span>
      </span>
      <span v-else-if="pageData.status === 4">
        <span>更改状态：</span>
        <el-popconfirm title="确定恢复吗？" @confirm="restoreFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">恢复</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="确定删除吗？" @confirm="removeFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
      <span v-else>
        <el-popconfirm title="确定删除吗？" @confirm="removeFlag(pageData.flagId)">
          <template #reference>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-popconfirm>
      </span>
    </el-divider>
    <el-collapse v-model="pageControl.activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="pageData" :model="pageData" label-width="5cm" style="max-width: 1000px">
          <el-form-item label="业务ID">
            <el-input v-model="pageData.flagId" size="small" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="pageData.flagName" @change="modifyFlagBasic" size="small" maxlength="30"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-radio-group v-model="pageData.type" @change="modifyFlagBasic" size="small">
              <el-radio :label="1">FLAG</el-radio>
              <el-radio :label="2">习惯</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="pageData.startDate"
                            @change="modifyFlagBasic" value-format="yyyy-MM-dd" size="small"
                            style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="pageData.endDate"
                            @change="modifyFlagBasic" value-format="yyyy-MM-dd" size="small"
                            style="width: 200px"></el-date-picker>
          </el-form-item>
          <el-form-item label="优先级">
            <el-select v-model="pageData.priority" @change="modifyFlagBasic" placeholder="请选择" size="small"
                       style="width: 200px">
              <el-option v-for="item in pageControl.options" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="pageData.description" @change="modifyFlagBasic" type="textarea" maxlength="200"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="期望目标">
            <el-input v-model="pageData.expected" @change="modifyFlagBasic" type="textarea" maxlength="200"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="实际成果">
            <el-input v-model="pageData.actual" @change="modifyFlagBasic" type="textarea" maxlength="200"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="见证人">
            <el-tag
              v-if="pageData.witnessName"
              closable
              :disable-transitions="false"
              @close="removeWitness">
              {{ pageData.witnessName }}
            </el-tag>
            <el-input
              v-if="pageControl.isWitnessInputVisible"
              v-model="pageData.witnessId"
              ref="saveTagInput"
              size="small"
              placeholder="请输入用户编号"
              @change="changeWitness">
            </el-input>
            <el-button v-else size="small" @click="pageControl.isWitnessInputVisible = true">+ 添加见证人</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="周期任务" name="2">
        <el-button type="primary" plain size="small" @click="newTask" style="float: right;">新增关联任务</el-button>
        <el-table :data="pageData.taskList" style="margin-left: 100px">
          <el-table-column prop="taskName" label="名称" width="150"></el-table-column>
          <el-table-column prop="description" label="简介" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="point" label="积分" width="150"></el-table-column>
          <el-table-column label="周期" width="300">
            <template #default="scope">
              <el-tag v-for="(item, index) in getTaskCycle(scope.row)" :key="index">
                {{ item }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button @click="modifyTask(scope.row.taskId)" type="text" size="small">编辑</el-button>
              <el-popconfirm title="将同时删除未完成的每日任务，确定吗？" @confirm="completeFlag(scope.row)">
                <template #reference>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <template v-if="pageControl.isNewTask">
      <el-dialog title="新增任务" :visible.sync="$store.state.flag.isTaskVisible">
        <task-detail :flagId="pageData.flagId"></task-detail>
      </el-dialog>
    </template>
    <template v-else>
      <el-dialog title="编辑任务" :visible.sync="$store.state.flag.isTaskVisible">
        <task-detail :flagId="pageData.flagId" :taskId="pageControl.taskIdProp"></task-detail>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import {queryFlagDetailAPI, modifyFlagBasicAPI, modifyFlagWitnessAPI, modifyFlagStatusAPI, removeFlagAPI} from '@/api/flag'
import {queryUserInfoAPI} from '@/api/user'
import taskDetail from './task-detail'

export default {
  components: {taskDetail},
  data () {
    return {
      pageData: {
        flagId: '',
        flagName: '',
        type: 0,
        status: 0,
        startDate: '',
        endDate: '',
        priority: 0,
        description: '',
        expected: '',
        actual: '',
        ownerId: '',
        ownerName: '',
        witnessId: '',
        witnessName: '',
        taskList: []
      },
      pageControl: {
        isWitnessInputVisible: false,
        isNewTask: false,
        taskIdProp: '0',
        activeNames: ['1', '2'],
        options: [
          {
            value: 1,
            label: '一般'
          },
          {
            value: 2,
            label: '重要'
          },
          {
            value: 3,
            label: '非常重要'
          }
        ]
      }
    }
  },
  created: function () {
    this.queryFlagDetail()
  },
  watch: {
    '$store.state.flag.isTaskVisible': function (newVal, oldVal) {
      if (newVal === false) {
        this.queryFlagDetail()
      }
    }
  },
  methods: {
    removeFlag (flagId) {
      removeFlagAPI({
        flagId: flagId
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('删除成功')
          this.$router.push('/flag')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    startFlag (flagId) {
      modifyFlagStatusAPI({
        flagId: flagId,
        status: 2
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('已开始，请注意每日任务')
          this.pageData.status = 2
        } else {
          this.$message.error('开始失败')
        }
      })
    },
    pauseFlag (flagId) {
      modifyFlagStatusAPI({
        flagId: flagId,
        status: 4
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('暂停成功')
          this.pageData.status = 4
        } else {
          this.$message.error('暂停失败')
        }
      })
    },
    restoreFlag (flagId) {
      modifyFlagStatusAPI({
        flagId: flagId,
        status: 2
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('还原成功')
          this.pageData.status = 2
        } else {
          this.$message.error('还原失败')
        }
      })
    },
    completeFlag (flagId) {
      modifyFlagStatusAPI({
        flagId: flagId,
        status: 3
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('已完成')
          this.pageData.status = 3
        } else {
          this.$message.error('完成失败')
        }
      })
    },
    getStatus (status) {
      let flagStatus = ''
      switch (status) {
        case 1:
          flagStatus = '未开始'
          break
        case 2:
          flagStatus = '进行中'
          break
        case 3:
          flagStatus = '已完成'
          break
        case 4:
          flagStatus = '暂停'
          break
      }
      return flagStatus
    },
    getTagType (status) {
      let tagType = ''
      switch (status) {
        case 1:
          // 未开始
          tagType = 'info'
          break
        case 2:
          // 进行中
          tagType = '-'
          break
        case 3:
          // 已完成
          tagType = 'success'
          break
        case 4:
          // 暂时
          tagType = 'warning'
          break
      }
      return tagType
    },
    removeWitness () {
      modifyFlagWitnessAPI({
        witnessId: '',
        witnessName: '',
        flagId: this.pageData.flagId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData.witnessId = null
          this.pageData.witnessName = null
          this.$message.success('删除见证人成功')
        }
      })
    },
    changeWitness () {
      if (this.pageData.witnessId === this.$cookies.get('userId')) {
        this.$message.error('不能添加自己')
        return
      }
      // 暂时这么实现，后端可以少写点
      queryUserInfoAPI({
        userId: this.pageData.witnessId
      }).then(response => {
        if (response.data.success === true) {
          this.pageData.witnessName = response.data.data.userName
          // 不嵌里面见证人取不到，不是按上下顺序执行代码的？
          modifyFlagWitnessAPI({
            witnessId: this.pageData.witnessId,
            witnessName: this.pageData.witnessName,
            flagId: this.pageData.flagId
          }).then(response => {
            if (response.data.success === true) {
              this.$message.success('更新见证人成功')
            } else {
              this.$message.error('更新见证人失败')
            }
          })
        } else {
          this.$message.error('该用户不存在，请输入正确的用户编号')
          return
        }
      })
      this.pageControl.isWitnessInputVisible = false

    },
    getTaskCycle (row) {
      switch (row.type) {
        case 1:
          return '临时任务'
        case 2:
          return this.getWeekCycle(row.cycleList)
        default:
          return '未知周期'
      }
    },
    getWeekCycle (cycles) {
      let weekCycle = []
      for (let i = 0; i < cycles.length; i++) {
        weekCycle[i] = weekCycle + ' ' + cycles[i]
        // 转换成文字周期
        switch (cycles[i]) {
          case '1':
            weekCycle[i] = '周一'
            break
          case '2':
            weekCycle[i] = '周二'
            break
          case '3':
            weekCycle[i] = '周三'
            break
          case '4':
            weekCycle[i] = '周四'
            break
          case '5':
            weekCycle[i] = '周五'
            break
          case '6':
            weekCycle[i] = '周六'
            break
          case '7':
            weekCycle[i] = '周日'
            break
          default:
            weekCycle[i] = '未知周期'
            break
        }
      }
      return weekCycle
    },
    modifyTask (taskId) {
      this.pageControl.taskIdProp = taskId
      this.pageControl.isNewTask = false
      this.$store.commit('setTaskVisible', true)
    },
    newTask () {
      this.pageControl.isNewTask = true
      this.$store.commit('setTaskVisible', true)
    },
    queryFlagDetail () {
      queryFlagDetailAPI(
        this.$route.params.id
      ).then(response => {
        this.pageData = response.data.data
      })
    },
    modifyFlagBasic () {
      modifyFlagBasicAPI({
        flagId: this.pageData.flagId,
        flagName: this.pageData.flagName,
        type: this.pageData.type,
        startDate: this.pageData.startDate,
        endDate: this.pageData.endDate,
        priority: this.pageData.priority,
        description: this.pageData.description,
        expected: this.pageData.expected,
        actual: this.pageData.actual
      }).then(response => {
        if (response.data.success === true) {
          this.$message.success('更新基本信息成功')
        }
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 500px;
}
</style>
