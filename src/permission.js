import router from './router'
import store from '@/store/index'
import { Message } from 'element-ui'
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('token')) {
    if (to.path === '/') {
      next('/index')
    } else {
      if (store.getters.roles.length === 0) {
        const roles = sessionStorage.getItem('roles')
        store.dispatch('permission/generateRoute', { roles })
          .then(() => {
            // console.log(store.getters.addRoutes)
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
          })
          .catch(err => {
            Message.error({ message: err })
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
