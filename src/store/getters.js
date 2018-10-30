const getters = {
    token: state => state.user.token,
    username: state => state.user.username,
    roles: state => state.permission.roles,
    addRoutes: state => state.permission.addRoutes
  }
  export default getters
