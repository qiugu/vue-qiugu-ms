const app = {
  namespaced: 'true',
  state: {
    isCollapse: false,
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
    set_todo: (state, data) => {
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
    }
  }
}
export default app
