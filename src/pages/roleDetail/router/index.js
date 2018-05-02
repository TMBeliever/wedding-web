import Vue from 'vue'
import Router from 'vue-router'

import roleDetail from '@/components/roleDetail'
import allRole from '@/components/allRole'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/role/:id',component:roleDetail
    },
    {
      path: '/:id',component:allRole
    },
    {
      path: '/search/:id',component:allRole
    }
  ]
})
