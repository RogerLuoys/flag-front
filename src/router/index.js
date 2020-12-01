import Vue from 'vue'
import Router from 'vue-router'
import flag from '@/views/flag/index'
import flagDetail from '@/views/flag/flag-detail'
import task from '@/views/task/index'
import report from '@/views/report/index'
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
