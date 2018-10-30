import { constRouterMap, asyncRouterMap } from '@/router'

function hasPermission (roles, route) {
  // console.log(roles);`
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      return route.meta.roles.indexOf(role) >= 0
    })
  } else {
    return true
  }
}

function filterAsyncRouter (asycnRouterMap, roles) {
  const accessRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        // route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  // console.log(accessRouters)
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
        const roles = []
        roles.push(data.roles)
        let accessRouters
        if (roles.indexOf('admin') >= 0) {
          accessRouters = asyncRouterMap
        } else {
          accessRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log(accessRouters)
        commit('SET_ROUTERS', accessRouters)
        commit('SET_ROLES', roles)
        resolve()
      })
    }
  }
}

export default permission
