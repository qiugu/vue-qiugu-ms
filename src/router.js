import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      alias: '/login',
      meta: {
        requireAuth: true
      },
      component: () => import ('@/views/Login.vue')
    },
    {
      path: '/layout',
      name: 'Layout',
      meta: {
        requireAuth: true
      },
      component: () => import ('@/views/Layout.vue'),
      // redirect: '/login',
      redirect: '/layout/home-page',
      children: [
        {
          path: '/layout/home-page',
          name: 'home-page',
          meta: {
            requireAuth: true,
            title: '首页'
          },
          component: () => import ('@/views/HomePage.vue')
        },
        {
          path: '/layout/about',
          name: 'about',
          meta: {
            requireAuth: true,
            title: '开发备忘'
          },
          component: () => import ('@/views/About.vue')
        },
        {
          path: '/layout/about-author',
          name: 'about-author',
          meta: {
            requireAuth: true,
            title: '关于作者'
          },
          component: () => import ('@/views/AboutAuthor.vue')
        },
        {
          path: '/layout/weather-fore',
          name: 'wether-fore',
          meta: {
            requireAuth: true,
            title: '天气预报'
          },
          component: () => import ('@/views/WeatherFore.vue')
        },
        {
          path: '/layout/dynamic-table',
          name: 'dynamic-table',
          meta: {
            requireAuth: true,
            title: '动态表格'
          },
          component: () => import ('@/views/DynamicTable.vue')
        },
        {
          path: '/layout/editable',
          name: 'editable',
          meta: {
            requireAuth: true,
            title: '可编辑表格'
          },
          component: () => import ('@/views/TableGrid.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'notfound',
      component: () => import ('@/views/NotFound.vue')
    }
  ]
})

export default router
