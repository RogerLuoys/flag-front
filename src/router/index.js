import Vue from 'vue'
import Router from 'vue-router'
import flag from '@/views/flag/index'
import flagDetail from '@/views/flag/flag-detail'
import taskDaily from '@/views/task-daily/index'
import report from '@/views/report/index'
import point from '@/views/point/index'
import message from '@/views/message/index'
import profile from '@/views/profile/index'
import login from '@/views/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/flag',
      name: 'flag',
      component: flag
    },
    {
      path: '/flagDetail/:id',
      name: 'flagDetail',
      component: flagDetail
    },
    {
      path: '/taskDaily',
      name: 'taskDaily',
      component: taskDaily
    },
    {
      path: '/report',
      name: 'report',
      component: report
    },
    {
      path: '/point',
      name: 'point',
      component: point
    },
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})
