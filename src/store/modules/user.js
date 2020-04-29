import { loginByUsername } from '../../services/user'
import { Notification } from 'element-ui'
const user = {
  namespaced: 'true',
  state: {
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token'),
    todos: []
  },
  mutations: {
    toggleSiderBar (state) {
      state.isCollapse = !state.isCollapse
    },
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    removeTodo (state, todo) {
      // 找到传递进来的todo索引，删除当前的todo
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    editTodo (state, { todo, text = todo.text, done = todo.done }) {
      todo.text = text
      todo.done = done
    },
    SET_USER: (state, data) => {
      state.username = data.username
    },
    SET_TOKEN: (state, data) => {
      state.token = data.token
    },
    SET_TODO: (state, data) => {
      state.todos = data
    }
  },
  actions: {
    addTodo ({ commit }, text) {
      commit('addTodo', {
        text,
        done: false
      })
    },
    removeTodo ({ commit }, todo) {
      commit('removeTodo', todo)
    },
    toggleTodo ({ commit }, todo) {
      commit('editTodo', {
        todo,
        done: !todo.done
      })
    },
    editTodo ({ commit }, { todo, value }) {
      commit('editTodo', {
        todo,
        text: value
      })
    },
    toggleAll ({ state, commit }, done) {
      state.todos.forEach((todo) => {
        commit('editTodo', {
          todo,
          done
        })
      })
    },
    clearCompleted ({ state, commit }) {
      //  找到数组中已经完成的项，再遍历已经完成的项，提交删除的commit
      state.todos.filter(todo => todo.done)
        .forEach(todo => {
          commit('removeTodo', todo)
        })
    },
    login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
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
          .catch(err => {
            Notification({ title: '提示', message: err, type: 'warning' })
          })
      })
    }
  }
}
export default user
