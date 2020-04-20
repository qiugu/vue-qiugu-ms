import { loginByUsername } from '@/api/login'
import { Message } from 'element-ui'
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
      console.log(userInfo.username)
      console.log(userInfo.password)
      fetch('/user/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: userInfo.password
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            console.log(response)
            const data = response.data
            if (response.data.resultCode !== 200) {
              Message({ message: response.data.resultMsg, type: 'warning' })
              return
            }
            sessionStorage.setItem('username', response.data.data.username)
            sessionStorage.setItem('token', response.data.data.token)
            sessionStorage.setItem('roles', response.data.data.roles)
            commit('SET_TOKEN', {
              token: response.data.data.token
            })
            commit('SET_USER', {
              username: response.data.data.username
            })
            resolve(data)
          })
          .catch(error => {
            // resolve()
            reject(error)
          })
      })
    }
  }
}
export default user
