<template>
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <input
        type="checkbox"
        class="toggle"
        :checked="todo.done"
        @change="toggleTodo(todo)"
      />
      <label
        v-text="todo.text"
        class="todo-content"
        @dblclick="editing = true"
      ></label>
      <button @click="removeTodo(todo)" class="destroy"></button>
    </div>
    <input
      type="text"
      class="edit"
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TodoItem',
  props: {
    todo: Object,
    default () {
      return {}
    }
  },
  data () {
    return {
      editing: false
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'editTodo',
      // 点击复选框，改变事项的完成状态
      'toggleTodo',
      'removeTodo'
    ]),
    doneEdit (e) {
      // 获得输入框中的值和当前组件的todo对象传递给相应的mutations
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.removeTodo(todo)
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>
