import React, {useRef, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function TodoList() {
    const [todos, setTodo] = useState([])
    const todoRef = useRef()
    
    const handleAddTodo = () => {
        const newTask = todoRef.current.value
        if (newTask !== ''){
            const newTodo = {id: uuidv4(), task: newTask, completed: false}
        const todo = [...todos, newTodo] 
        setTodo(todo)
        localStorage.setItem("mytodos", JSON.stringify(todo))
        todoRef.current.value = null
        } else {
            alert("No task given.")
        }
    }
    
    const handleCheckBox = (id) => {
        const newTodos = [...todos]
        const updateTodos = newTodos.map(todo => todo.id === id ?
            {...todo, completed: !todo.completed} : todo
        )
        setTodo(updateTodos)
        localStorage.setItem('mytodos', JSON.stringify(updateTodos))
    }

    const handleClearComplete = () => {
        const newTodos = [...todos]
        const leftTodos = todos.filter(todo => !todo.completed)
        setTodo(leftTodos)
        localStorage.setItem('mytodos', JSON.stringify(leftTodos))
    }

    useEffect(() => {
        const storedTodos = localStorage.getItem('mytodos')
        if (storedTodos) {
            setTodo(JSON.parse(storedTodos))  
        }
    },[])

  return (
    <div>
        
        <input ref={todoRef} type='text' />
        <button onClick={handleAddTodo}>Add new task</button>
        <button onClick={handleClearComplete}>Clear completed</button><br/>
        Total task: {todos.length} <br/>
        Completed tasks: {todos.filter(todo => todo.completed).length} <br/>
        Left tasks: {todos.filter(todo => !todo.completed).length}
        {todos.map(todo => (
            <p index={todo.id}>
                <input type='checkbox' onClick={() => handleCheckBox(todo.id)} checked={todo.completed}/>
                {todo.task}
            </p>
        ))}
    </div>
  )
}
