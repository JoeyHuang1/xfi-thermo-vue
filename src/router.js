import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import { baseUrl } from '../vue.config.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: baseUrl+'/thermos',
      name: 'ThermoList',
      //component: ThermoList
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "thermos" */ './views/ThermoList.vue')
    },
    {
      path: '*',
      name: 'Login',
      component: Login
    },
  ]
})
