import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constRouterMap = [
  {
    path: '/login',
    name: 'Login',
    alias: '/',
    meta: {
      title: '登录',
      keepAlive: false
    },
    component: () => import(/* webpackChunkName: "Login" */'@/views/user/Login.vue')
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */'@/components/layout/Layout.vue'),
    // redirect: '/login',
    // redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "HomePage" */'@/views/home/Home.vue')
      },
      {
        path: '/editable',
        name: 'editable',
        meta: {
          title: '可编辑表格',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "TableGrid" */'@/views/friction/TableGrid.vue')
      },
      {
        path: '/charts',
        name: 'charts',
        component: () => import(/* webpackChunkName: "charts" */'@/views/MagicCube.vue'),
        meta: {
          title: '图表',
          keepAlive: false
        }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/layout',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/access',
        name: 'access',
        component: () => import(/* webpackChunkName: "AccessTest" */'@/views/AccessTest.vue'),
        meta: {
          title: '权限控制',
          roles: ['admin'],
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/error',
    component: () => import(/* webpackChunkName: "NotFound" */'@/views/NotFound.vue')
  },
  {
    path: '*', redirect: '/error', hidden: true
  }
]

export default new Router({
  mode: 'history',
  routes: constRouterMap
})
