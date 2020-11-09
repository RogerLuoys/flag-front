<template>
  <div>
    <el-page-header @back="$router.push('/flaglist')" content="FLAG详情" title="返回列表">
    </el-page-header>

    <el-divider>任务A</el-divider>
    <el-form ref="flagForm" :model="flagForm" label-width="5cm" style="max-width: 1000px">
      <el-form-item>
        <el-button type="primary" @click="onSubmit"  size="small">保存</el-button>
        <el-button  size="small">完成</el-button>
        <el-button  size="small">暂停</el-button>
        <el-button  size="small">删除</el-button>
        <el-button  size="small">还原</el-button>
      </el-form-item>
      <el-form-item label="业务ID：">
        <el-input v-model="flagForm.flagID" size="small" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="名称：">
        <el-input v-model="flagForm.flagID" size="small"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio-group v-model="flagForm.flagID"  size="small">
          <el-radio label="FLAG"></el-radio>
          <el-radio label="习惯"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间：">
        <el-date-picker type="date" placeholder="选择日期" v-model="flagForm.date"  size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker type="date" placeholder="选择日期" v-model="flagForm.date"  size="small"></el-date-picker>
      </el-form-item>
      <el-form-item label="优先级：">
        <el-select v-model="pageControl.options.value" placeholder="请选择"  size="small">
          <el-option
            v-for="item in pageControl.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="flagForm.flagID" type="textarea" style="max-width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="期望目标：">
        <el-input v-model="flagForm.flagID" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="实际成果：">
        <el-input v-model="flagForm.flagID" type="textarea"></el-input>
      </el-form-item>
      <div style="margin-left: 90px;">
        <el-divider content-position="right">
          <span>任务列表：</span>
          <el-button type="text" size="small">点我新增关联任务</el-button>
        </el-divider>
      </div>
      <el-table :data="flagForm.table" style="margin-left: 100px">
        <el-table-column prop="taskID" label="名称" width="150"></el-table-column>
        <el-table-column prop="taskID" label="简介" width="150"></el-table-column>
        <el-table-column prop="taskID" label="积分" width="150"></el-table-column>
        <el-table-column prop="taskID" label="周期" width="150"></el-table-column>
        <el-table-column prop="taskID" label="操作" width="150">
          <template v-slot="scope">
            <el-button @click="queryDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="complete(scope.row)" type="text" size="small">完成</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flagForm: {
          flagID: "test",
          flagName: "",
          type: "",
          startDate: "",
          endDate: "",
          priority: "",
          description: "",
          expected: "",
          actual: "",
          date: "2020-10-17",
          table: [
            {
              taskID: "test2",
              taskName: "",
              description: "",
              point: "",
              cycle: "",
            }
          ]
        },
        pageControl: {
          options: [
            {
              value: "1",
              label: "一般"
            },
            {
              value: "2",
              label: "重要"
            },
            {
              value: "3",
              label: "非常重要"
            },
          ]
        }
      }
    },
    created:function () {
      queryDetail(1);
    },
    methods: {
      queryDetail(e) {
        let _id = this.$route.params.id;
        console.info("输出路由id"+_id);
        console.info("输出行内容"+e.taskID);
      }
    }
  }
</script>

<style scoped>
  .el-input {
    width: 500px;
  }
</style>
