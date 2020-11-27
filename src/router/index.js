import Vue from 'vue'
import Router from 'vue-router'
import flag from '@/pages/flag/index'
import flagDetail from '@/pages/flag/flag-detail'
import task from '@/pages/task/index'
import report from '@/pages/report/index'
import message from '@/pages/message/index'
import profile from '@/pages/profile/index'
import login from '@/pages/login/index'

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
      path: '/task',
      name: 'task',
      component: task
    },
    {
      path: '/report',
      name: 'report',
      component: report
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
