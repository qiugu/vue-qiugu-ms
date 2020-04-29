import router from './router'
import store from '@/store'
import { Notification } from 'element-ui'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    if (to.path === '/') {
      next('/index')
    } else {
      if (store.getters.roles.length === 0) {
        const roles = JSON.parse(sessionStorage.getItem('roles'))
        store.dispatch('permission/generateRoute', roles)
          .then(() => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
          })
          .catch(err => {
            Notification.error({ title: '提示', message: err })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
