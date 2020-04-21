import { loginByUsername } from '../../services/user'
import { Notification } from 'element-ui'
const user = {
  namespaced: 'true',
  state: {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token')
  },
  mutations: {
    SET_USER: (state, data) => {
      state.username = data.username
    },
    SET_TOKEN: (state, data) => {
      state.token = data.token
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            console.log(response)
            if (response.code !== 200) {
              Notification({ title: '提示', message: response.msg, type: 'warning' })
              return
            }
            sessionStorage.setItem('username', response.result.username)
            sessionStorage.setItem('token', response.result.token)
            sessionStorage.setItem('roles', JSON.stringify(response.result.roles))
            commit('SET_TOKEN', {
              token: response.result.token
            })
            commit('SET_USER', {
              username: response.result.username
            })
            resolve(response)
          })
      })
    }
  }
}
export default user
