import React from "react"
import ReactDOM from "react-dom/client"
import { useImmerState } from "./immer"
let id = 1
function Todos() {
  const [todos, setTodos] = useImmerState({
    list: [],
  })
  const addTodo = () =>
    setTodos((draft) => {
      draft.list.push(id++)
    })
  return (
    <>
      <button onClick={addTodo}>增加</button>
      <ul>
        {todos.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Todos />)
