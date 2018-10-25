import router from './router'

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
      if (!sessionStorage.getItem('token')) {
        if (to.path === '/') {
          next()
        } else {
          next('/')
        }
      } else if (to.name === 'Login') {
        next('/layout/home-page')
      } else {
        next()
      }
    } else {
      next()
    }
})