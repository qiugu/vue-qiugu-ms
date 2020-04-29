import { constRouterMap, asyncRouterMap } from '@/router/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

function filterAsyncRouter (asyncRouter, roles) {
  const accessRouters = asyncRouter.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessRouters
}

const permission = {
  namespaced: 'true',
  state: {
    router: constRouterMap,
    addRoutes: [],
    roles: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRoutes = routers
      state.router = constRouterMap.concat(routers)
    },
    SET_ROLES: (state, data) => {
      state.roles = data
    }
  },
  actions: {
    generateRoute ({ commit }, data) {
      return new Promise((resolve, reject) => {
        const accessRouters = filterAsyncRouter(asyncRouterMap, data)
        commit('SET_ROUTERS', accessRouters)
        commit('SET_ROLES', data)
        resolve()
      })
    }
  }
}

export default permission
