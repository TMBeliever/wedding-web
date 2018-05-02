import Vue from 'vue'
import Router from 'vue-router'

import caseDetail from '@/components/caseDetail'
import allCase from '@/components/allCase'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/case/:id',component:caseDetail
    },
    {
      path: '/all',component:allCase
    },
    {
      path: '/:id',component:allCase
    }
  ]
})
