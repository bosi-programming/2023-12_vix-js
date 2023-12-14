<script setup lang="ts">
import { ref } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const todos = ref<Todo[]>([
  { id: 0, text: 'Learn Vue 3', done: false },
])

const addTodo = (e: AddEvent) => {
  todos.value.push({
    id: todos.value.length,
    text: e.detail,
    done: false,
  })
}

const removeTodo = (e: DeleteEvent) => {
  todos.value = todos.value.filter((todo: Todo) => todo.id !== e.detail.id)
}

const toggleTodo = (e: ToggleEvent) => {
  const todo = todos.value.find((todo: Todo) => todo.id === e.detail.id)
  if (todo) {
    todo.done = !todo.done
    todos.value = [...todos.value, todo]
  }
}

</script>

<template>
  <div>
    <todo-input @add="addTodo" />
    <ul v-for="todo in todos" :key="todo.id">
      <todo-item :data-itemId="todo.id.toString()" :data-text="todo.text.toString()"
        :data-completed="todo.done.toString()" @delete="removeTodo" @toggle="toggleTodo" />
    </ul>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
