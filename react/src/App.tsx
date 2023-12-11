import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

let id = 0;

function App() {
  const [todos, setTodos] = useState([{ id: 0, text: 'Learn React', done: false }])
  console.log(todos)
  const todoFormRef = useRef<HTMLFormElement>(null);

  const addTodo = useCallback((text: string) => {
    id++
    setTodos([...todos, {
      id,
      text,
      done: false
    }])
  }, [todos])

  useEffect(() => {
    todoFormRef.current?.addEventListener('add', (e) => {
      addTodo(e.detail)
    })
  }, [todoFormRef, addTodo])

  return (
    <todo-input ref={todoFormRef} />
  )
}

export default App
