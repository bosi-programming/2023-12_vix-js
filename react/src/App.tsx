import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{ id: 0, text: 'Learn React', done: false }])
  const todoFormRef = useRef<HTMLFormElement>(null);

  const addTodo = useCallback((text: string) => {
    const id = Math.max(...todos.map(todo => todo.id)) + 1
    setTodos([...todos, {
      id,
      text,
      done: false
    }])
  }, [todos])

  const removeTodo = useCallback((id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, [])

  const checkTodo = useCallback((id: number) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }, [])

  useEffect(() => {
    todoFormRef.current?.addEventListener('add', (e) => {
      addTodo(e.detail)
    })
  }, [todoFormRef, addTodo])

  const todoItemRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      node.addEventListener('delete', (e) => {
        removeTodo(e.detail.id)
      })
      node.addEventListener('toggle', (e) => {
        checkTodo(e.detail.id)
      })
    }
  }, [checkTodo, removeTodo])

  return (
    <>
      <todo-input ref={todoFormRef} />
      <ul>
        {todos.map(todo => (
          <todo-item key={todo.id} ref={todoItemRef} data-itemId={todo.id} data-text={todo.text} data-completed={todo.done} />
        ))}
      </ul>
    </>
  )
}

export default App
