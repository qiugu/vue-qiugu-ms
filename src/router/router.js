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
    component: () => import(/* webpackChunkName: "Login" */'@/views/Login.vue')
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
        component: () => import(/* webpackChunkName: "HomePage" */'@/views/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {
          title: '开发备忘',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "About" */'@/views/About.vue')
      },
      {
        path: '/author',
        name: 'author',
        meta: {
          title: '关于作者',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "AboutAuthor" */'@/views/AboutAuthor.vue')
      },
      {
        path: '/weather',
        name: 'wether-fore',
        meta: {
          title: '天气预报',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "WeatherFore" */'@/views/WeatherFore.vue')
      },
      {
        path: '/dynamic',
        name: 'dynamic-table',
        meta: {
          title: '动态表格',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "DynamicTable" */'@/views/DynamicTable.vue')
      },
      {
        path: '/editable',
        name: 'editable',
        meta: {
          title: '可编辑表格',
          keepAlive: true
        },
        component: () => import(/* webpackChunkName: "TableGrid" */'@/views/TableGrid.vue')
      },
      {
        path: '/teditor',
        name: 'teditor',
        meta: {
          title: 'tinymce',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "RichText" */'@/views/RichText.vue')
      },
      {
        path: '/weditor',
        name: 'weditor',
        meta: {
          title: 'wangeditor',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "WangEditor" */'@/views/WangEditor.vue')
      },
      {
        path: '/validate',
        name: 'validate',
        meta: {
          title: '表单验证',
          keepAlive: false
        },
        component: () => import(/* webpackChunkName: "ValidateForm" */'@/views/ValidateForm.vue')
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
      },
      {
        path: '/cube',
        name: 'cube',
        component: () => import(/* webpackChunkName: "MagicCube" */'@/views/MagicCube.vue'),
        meta: {
          title: '魔幻立方',
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
