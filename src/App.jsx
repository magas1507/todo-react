import React,{ Fragment, useState,useRef} from  'react';//useRef hace referencia al eelemento 
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid'

export function App(){
  const [todos,setTodos] = useState([
    {id:1, task:"tarea-1", complete: false}
  ])
  //para poder usar el useRef hay que declararlo
  const todoTaskRef = useRef()

const toggleTodo = (id) =>{
  const newTodos = [...todos];
  const todo = newTodos.find((todo)=> todo.id === id);
  todo.completed = !todo.complete;
  setTodos(newTodos)
}
const handleTodoAdd= () =>{
   
  const task = todoTaskRef.current.value;
  
  if(task === "") return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed:false }]
    })

    todoTaskRef.current.value = null
  }
  
  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
      <button onClick={handleTodoAdd}>+</button>
      <button>-</button>
      <div>Te quedan {todos.filter((todo)=>!todo.complete).length} tareas por terminar</div>
    </Fragment>
  )
}