import React from 'react'
// las propiedades se escuchan de arriba hacia abajo y los evento de abajo hacia arriba
export function TodoItem({ todo, toggleTodo}){
  const { id, task, completed } = todo

  const handleTodoClick = () =>{
    toggleTodo(id)
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleTodoClick} /> 
      {task}
    </li>
  )
}