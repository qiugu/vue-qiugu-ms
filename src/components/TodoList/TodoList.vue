<template>
    <div class="todoapp">
        <!-- header -->
        <header class="header">
            <input
                class="new-todo"
                placeholder="What needs to be done?"
                @keyup.enter="addTodo"/>
        </header>
        <!-- main section -->
        <section
            class="content"
            v-show="todos.length">
            <input
                class="toggle-all"
                id="toggle-all"
                type="checkbox"
                :checked="allChecked"
                @change="toggleAll(!allChecked)"
                :value="allChecked">
            <label for="toggle-all"></label>
            <ul class="todo-list">
                <TodoItem
                    v-for="(todo, index) in filteredTodos"
                    :key="index"
                    :todo="todo"/>
            </ul>
        </section>
        <!-- footer -->
        <footer
            class="footer"
            v-show="todos.length">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
                {{ remaining | pluralize('item') }} left
            </span>
            <ul class="filters">
                <li v-for="(val, key) in filters" :key="key">
                    <a
                        :class="{ selected: visibility === key }"
                        @click="visibility = key">{{ key | capitalize }}</a>
                </li>
                <li v-show="todos.length > remaining">
                    <a @click="clearCompleted">
                        Clear completed
                    </a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import TodoItem from './TodoItem.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
export default {
  components: { TodoItem },
  data () {
    return {
      visibility: 'all',
      filters: filters
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      //  检测todos中done属性，如果全部都为true，也就是都完成的情况下，返回true，否则返回false
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      //  返回过滤后三种状态的todos,all,active,complete
      return filters[this.visibility](this.todos)
    },
    remaining () {
      //  返回done为false的选项，也就是未完成的事项的长度
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('addTodo', text)
      }
      e.target.value = ''
    }
  },
  filters: {
    //  过滤items的复数形式，等于1的时候不加s，其他情况都加上s
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    //  首字母大写过滤
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>

<style lang="scss">
    @import "../../assets/todos";
</style>
