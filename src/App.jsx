import React,{ Fragment, useState, useRef,useEffect } from  'react';//useRef hace referencia al eelemento 
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid'

export function App(){
  const [todos,setTodos] = useState([
    {id:1, task:"tarea-1", completed: false}
  ])
 const KEY = "todoApp.todos";
  //locaStorage: nos va a permitir guardar las tareas aun que refresquemos 

//useEffect:es usado para actualizaciones en el DOM
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(KEY));
  if(storedTodos){
    setTodos(storedTodos)
  }

}, [])
//llammos a useEffect que recibe una funcion de callback y array de dpendncia y si quieres que se ejecute constantemente colocas ahi las dependencias que quieres que se escuche
useEffect(() => {
  //localsstora solo almacena string
  localStorage.setItem(KEY, JSON.stringify(todos))

}, [todos])
  
//para poder usar el useRef hay que declararlo
  const todoTaskRef = useRef()

const toggleTodo = (id) =>{
  const newTodos = [...todos];
  const todo = newTodos.find((todo)=> todo.id === id);
  todo.completed = !todo.completed;
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
//elimina las tareas 
const handleClearAll = () =>{
  const newTodos = todos.filter((todo) => !todo.completed)
  setTodos(newTodos);
}


  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>Te quedan {todos.filter((todo)=>!todo.completed).length} tareas por terminar</div>
    </Fragment>
  )
}