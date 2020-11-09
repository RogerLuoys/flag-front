import Vue from 'vue'
import Router from 'vue-router'
import flaglist from '@/pages/flag-list'
import flagdetail from '@/pages/flag-detail'
import tasklist from '@/pages/task-list'
import templatelist from '@/pages/template-list'
import messagelist from '@/pages/message-list'
import profile from '@/pages/profile'
import login from '@/pages/login'

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
      path: '/flaglist',
      name: 'flaglist',
      component: flaglist
    },
    {
      path: '/flagdetail/:id',
      name: 'flagdetail',
      component: flagdetail
    },
    {
      path: '/tasklist',
      name: 'tasklist',
      component: tasklist
    },
    {
      path: '/templatelist',
      name: 'templatelist',
      component: templatelist
    },
    {
      path: '/messagelist',
      name: 'messagelist',
      component: messagelist
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
    // {
    //   path: '/calendar',
    //   name: 'calendar',
    //   component: calendar
    // }
  ]
})
