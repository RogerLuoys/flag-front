<template>
  <div>
    <el-tabs tab-position="left" style="height: 500px;">
      <el-tab-pane label="聊天侧边栏">
        <el-row>
          <el-col :span="12"><div style="background-color: darkgrey;text-align: center;height: 800px">这是大背景图···</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <span>企业微信扫码 一键安装微企服</span>
            <el-tooltip content="机构已绑定企业微信，且模式是ISV则显示已安装；相关表：dzb_wechat_internal_isv_groupchat_relation">
              <el-tag size="mini">已安装</el-tag>
            </el-tooltip>
            <el-tooltip content="会同时更新ISV和自建模式的数据；相关表：dzb_company_wechat_groupchat、dzb_wechat_internal_isv_groupchat_relation、dzb_wechat_follow_user、dzb_wechat_external_user、dzb_wechat_internal_isv_external_user_relation">
              <el-button type="warning" size="small" plain style="right: 30px">更新客户数据</el-button>
            </el-tooltip>
            <el-popover trigger="hover">
              <template #default>
                <div>只有线上环境有二维码，其它环境需要通过链接安装</div>
                <div>test--http://xmanage.manage-test.sit.91lyd.com/xmanage/manage/v2/dzb/wechat/isv/getAuthQrCode</div>
                <div>release--http://release-17dz.dc.servyou-it.com/xqy-portal-web/manage/v2/dzb/wechat/isv/getAuthQrCode</div>
                <div>pre--http://uat-www.17dz.com/xqy-portal-web/manage/v2/dzb/wechat/isv/getAuthQrCode</div>
              </template>
              <template #reference>
                <div style="height: 161px;text-align: center;width: 500px;color: red">
                  这是应用二维码···
                </div>
              </template>
            </el-popover>
            <el-tooltip content="指的是企业微信管理员，但同时需要是该机构的机构负责人才能完成全部配置流程">
              <div style="text-align: center;color: red">请用管理员身份扫码</div>
            </el-tooltip>
            <div style="text-align: center">将应用的【 开启范围 】设置到最大 查阅安装教程></div>
            <div style="text-align: center">
              <el-tooltip content="只有叫‘亿企赢浙江’的企业微信开通了备份，测试到线上的备份相关测试都需在此测试；线上能备份的机构名叫‘***重庆机构’">
                <span style="color: red">如需开通群消息备份，请开启</span>
              </el-tooltip>
              <el-switch v-model="isTrue"></el-switch>
            </div>
            <el-steps :active="3" align-center>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep1=true">创建应用</el-button>
                </template>
              </el-step>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep2=true">配置回调</el-button>
                </template>
              </el-step>
              <el-step status="success">
                <template #description>
                  <el-button @click="config.isStep3=true">配置密钥</el-button>
                </template>
              </el-step>
            </el-steps>
          </div></el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="客户群管理">
        <el-select clearable size="mini" placeholder="筛选"
                   style="width:110px; float:left">
        </el-select>
        <el-input placeholder="请输入名称" suffix-icon="el-icon-search" size="mini" style="width:200px; float:left"></el-input>
        <el-tooltip content="历史bug：包含流失和名称不能同时搜索">
          <el-checkbox style="color: red">包含流失</el-checkbox>
        </el-tooltip>
        <el-button type="primary" size="mini" style="float:right">一键关联</el-button>
        <el-table border :data="customer.data" size="mini" style="width: 100%;height: 400px">
          <el-table-column prop="name" label="客户简称">
            <template #header>
              <el-tooltip content="即客户模块中的那些，需要有服务开通权限">
                <span style="color: red">客户简称</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="counselor" label="服务顾问">
          </el-table-column>
          <el-table-column prop="manager" label="客户经理">
          </el-table-column>
          <el-table-column prop="type" label="客户类型">
          </el-table-column>
          <el-table-column prop="customer" label="对应联系人">
            <template #header>
              <el-tooltip content="这是企业微信中的外部联系人">
                <span style="color: red">对应联系人</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="group" label="关联群">
            <template #header>
              <el-tooltip content="这是企业微信中的外部群">
                <span style="color: red">关联群</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="alias" label="客户尊称">
            <template #header>
              <el-tooltip content="在推送消息的时候会用到">
                <span style="color: red">客户尊称</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip content="ISV和自建模式的设置相互独立">
                <el-button @click="customer.isVisible=true" type="text" size="small">设置关联</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="群消息备份">
        <el-input placeholder="请输入名称" suffix-icon="el-icon-search" size="mini" style="width:200px;"></el-input>
        <el-tooltip content="客户可以选择是否同意存档，默认同意，可以改成不同意；不同意存档客户发的消息不能备份">
          <el-checkbox style="color: red">不同意存档</el-checkbox>
        </el-tooltip>
        <el-tooltip content="后台有时限，最多10分钟更新一次，另外企业微信也有延时，发出的消息不能马上获取到备份">
          <el-button type="warning" size="mini" style="float:right;">更新数据</el-button>
        </el-tooltip>
        <el-tabs>
          <el-tab-pane label="群聊">
            <el-table border :data="backup.group" @row-click="backup.isVisible=true" size="mini" style="width: 100%;height: 390px">
              <el-table-column prop="name" label="群名称">
                <template #header>
                  <el-tooltip content="需要自己作为企业微信内部员工在群中，且信息同步正常，才能看到">
                    <span style="color: red">群名称</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="customer" label="关联客户">
                <template #header>
                  <el-tooltip content="关联过客户才能看到备份，但不影响后台从腾讯拉取备份">
                    <span style="color: red">关联客户</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="owner" label="群主">
              </el-table-column>
              <el-table-column prop="member" label="群成员">
              </el-table-column>
              <el-table-column prop="time" label="创建时间">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="单聊">
            <el-table border :data="backup.person" @row-click="backup.isVisible=true" size="mini" style="width: 100%;height: 390px">
              <el-table-column prop="name" label="客户昵称/备份">
                <template #header>
                  <el-tooltip content="只有自己的客户(外部联系人)才会显示">
                    <span style="color: red">关联客户</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="customer" label="关联客户">
              </el-table-column>
              <el-table-column prop="owner" label="备份账号">
                <template #header>
                  <el-tooltip content="企业微信后台里的备份账号（一个内部成员），只有开通的账号，才能取到备份">
                    <span style="color: red">备份账号</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="创建时间">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="群发机器人">
        <el-input placeholder="请输入名称" clearable size="mini" suffix-icon="el-icon-search" style="width:200px; float:left"></el-input>
        <el-tooltip content="此模板属于富文本框，需要注意各种html标题，如字体、换行、空格等">
          <el-dropdown split-button type="warning" @click="message.isTemplate=true" size="mini" style="float:right">
            模板设置
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>推送速度设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tooltip>
        <el-tooltip content="需要在微端操作，且注意uc服务的stable环境不稳定，用他们test">
          <el-button @click="message.isNew=true" type="warning" plain size="mini" style="float:right">新建群发</el-button>
        </el-tooltip>
        <el-table border :data="message.list" size="mini" style="width: 100%;height: 400px">
          <el-table-column prop="name" label="群发名称">
          </el-table-column>
          <el-table-column prop="operator" label="操作人">
          </el-table-column>
          <el-table-column prop="data" label="内容预览" show-overflow-tooltip>
            <template #header>
              <el-tooltip content="这里显示的是模板内容">
                <span style="color: red">内容预览</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="发送时间">
          </el-table-column>
          <el-table-column prop="group" label="已选择群聊">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="message.isView=true" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next, jumper" :total="100" style="float: right"></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="config.isStep1" title="开启群消息备份-1" append-to-body>
      <el-tag type="info" style="width: 100%">企业微信后台-创建自建应用，粘贴Secret字段</el-tag>
      <el-form label-width="90px">
        <el-form-item label="CorpID">
          <el-input placeholder="wwc412c56af76e9438" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Secret">
          <el-tooltip content="此参数走缓存，曾经有线上bug：客户填错，然后修改，但不生效，因为缓存没更新">
            <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY" size="small"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="warning" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="config.isStep2" title="开启群消息备份-2" append-to-body>
      <el-tag type="info" style="width: 100%">
        1、客户回调：在企业微信后台【客户联系-客户-API-接收事件服务器】<br/>
        注：请确保【接收事件服务器】下方的“可调用应用”勾选了「微企服」<br/>
        2、成员回调：在企业微信后台【管理工具-通讯录同步-设置接收事件服务器】
      </el-tag>
      <div>https://www.17dz.com/xaiwork/wechat/549613863897/event/callback</div>
      <el-button type="text">复制URL</el-button>
      <el-form label-width="90px" size="small">
        <el-form-item label="CorpID">
          <el-input placeholder="wwc412c56af76e9438"></el-input>
        </el-form-item>
        <el-form-item label="Secret">
          <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="warning" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="config.isStep3" title="开启群消息备份-3" append-to-body width="30%">
      <div>
        1开启群消息备份，请先确保您的企业微信已使用“会话消息存档”功能，并完成了存档的配置。
      </div>
      <el-input placeholder="AZfRDPXW7IzvPMs7AigH75wy3XsRXJThbSVFRy5v1kY"></el-input>
      <div style="text-align: center">
        <el-button type="warning" size="small">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="customer.isVisible" title="变更" append-to-body>
      <el-form label-width="110px" size="small">
        <el-form-item label="客户">
          <div>广州菱惠穗贸易有限责任公司</div>
        </el-form-item>
        <el-form-item label="客户尊称">
          <span>尊贵的客人</span>
          <el-button type="text">编辑</el-button>
        </el-form-item>
        <el-form-item label="关联联系人：">
          <span>某某某公司的代表</span>
          <el-tooltip content="只能操作自己，或自己下属的客户（企业微信中的客户）">
            <el-button type="text" style="float: right">绑定</el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="绑定群聊：">
          <span>与代表沟通的客户群</span>
          <el-tooltip content="如果已关联客户，则此处只能关联客户所在的外部群，如果未关联客户，则可以关联自己或自己下属所在的群">
            <el-button type="text" style="float: right">绑定</el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <el-button type="text" size="small">清空关联客户</el-button>
    </el-dialog>
    <el-drawer :visible.sync="backup.isVisible" title="备份" append-to-body size="40%">
      <el-card>
        <el-form label-width="110px" size="small">
          <el-form-item label="会话名称">
            <div>某某某群/某某某客户</div>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>2021-08-27</span>
          </el-form-item>
          <el-form-item label="关联客户">
            <span>某某某公司的代表</span>
          </el-form-item>
          <el-form-item label="会话成员">
            <el-tooltip content="外部群中的客户，会实时更新">
              <el-button type="text">10</el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <template #header>
          <span>会话消息备份</span>
          <el-date-picker type="date" placeholder="选择日期" size="mini" style="width: 150px; float: right"></el-date-picker>
          <el-input placeholder="请输入" clearable size="mini" style="width:150px; float:right"></el-input>
        </template>
        <el-tabs>
          <el-tab-pane label="全部">
            <el-row>
              <el-col :span="3">头像···</el-col>
              <el-col :span="13">昵称···<br/>正文···</el-col>
              <el-col :span="8">2021-08-27 10:00:00</el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="文本"></el-tab-pane>
          <el-tab-pane label="图片"></el-tab-pane>
          <el-tab-pane label="文件"></el-tab-pane>
          <el-tab-pane label="视频"></el-tab-pane>
          <el-tab-pane label="语音"></el-tab-pane>
        </el-tabs>
      </el-card>
    </el-drawer>
    <el-dialog :visible.sync="message.isView" title="发消息到客户群" append-to-body>
      <el-form label-width="110px" size="small">
        <el-form-item label="群发名称">
          <div>清卡提醒</div>
        </el-form-item>
        <el-form-item label="发送时间">
          <span>2021-06-24 21:21</span>
        </el-form-item>
        <el-form-item label="操作人">
          <span>机构内的某员工昵称</span>
        </el-form-item>
        <el-form-item label="发送客户">
          <span>单客户/多客户</span>
        </el-form-item>
        <el-form-item label="消息1">
          <span>「客户尊称」，您的企业「企业全称」：请确保完成本月的清卡工作，如已清卡请忽略本消息。感谢您的配合！</span>
        </el-form-item>
        <el-form-item label="消息2">
          <span>这是个图片（如果为空则不线上）</span>
        </el-form-item>
      </el-form>
      <el-button type="text" size="small">清空关联客户</el-button>
    </el-dialog>
    <el-dialog :visible.sync="message.isNew" title="群发消息模版" append-to-body>
      <div>按模板推送</div>
      <div>
        <el-row :gutter="5">
          <el-col span="6">
            <el-card style="width: 130px">清卡提醒</el-card>
          </el-col>
          <el-col span="6">
            <el-card style="width: 130px">社保变更核对</el-card>
          </el-col>
          <el-col span="6">
            <el-card style="width: 130px">个税变更核对</el-card>
          </el-col>
          <el-col span="5">
            <el-card style="width: 130px">交票提醒</el-card>
          </el-col>
        </el-row>
        <el-card style="width: 130px">抄税提醒</el-card>
      </div>
      <div>其它</div>
      <span @click="message.isNewMessage=true">
        <el-tooltip content="可不必切企业微信，只要将任意一个群名改成客户关联的名字，即可发送；流程：前端请求-uc处理请求并发给客户端-客户端操作企业微信">
          <el-card style="width: 130px;color: red">自定义推送</el-card>
        </el-tooltip>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="message.isTemplate" title="模板设置" append-to-body style="height: 800px">
      <el-tabs type="border-card" tab-position="left" style="height: 400px">
        <el-tab-pane label="清卡提醒">清卡提醒</el-tab-pane>
        <el-tab-pane label="社保变更核对">社保变更核对</el-tab-pane>
        <el-tab-pane label="续签即将过期提醒">续签即将过期提醒</el-tab-pane>
        <el-tab-pane label="续签过期提醒">续签过期提醒</el-tab-pane>
        <el-tab-pane label="个税变更核对">个税变更核对</el-tab-pane>
        <el-tab-pane label="交票提醒">交票提醒</el-tab-pane>
        <el-tab-pane label="抄税提醒">抄税提醒</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isTrue: true,
      isFalse: false,
      config: {
        isStep1: false,
        isStep2: false,
        isStep3: false
      },
      customer: {
        isVisible: false,
        data: [{
          name: '某某某公司',
          counselor: '某高级顾问',
          manager: '某专职经理',
          type: '代账/非代账',
          customer: '某某某公司的代表',
          group: '与代表沟通的客户群',
          alias: '尊贵的客人'
        }]
      },
      backup: {
        isVisible: false,
        group: [{
          name: '与代表沟通的客户群',
          customer: '某某某公司的代表',
          owner: '某会计',
          member: '10',
          time: '2021-08-08'
        }],
        person: [{
          name: '对应的外部客户',
          customer: '某某某公司的代表',
          owner: '可备份的内部成员',
          time: '2021-08-08'
        }]
      },
      message: {
        isNew: false,
        isNewMessage: false,
        isTemplate: false,
        isSpeed: false,
        isView: false,
        list: [{
          name: '清卡提醒',
          operator: '机构内部员工某某',
          data: '尊敬的老板，您的企业「企业全称」：请确保完成本月的清卡工作，如已清卡请忽略本消息。感谢您的配合！',
          time: '2021-08-30 12:00:00',
          group: '100'
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
