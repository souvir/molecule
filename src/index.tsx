// Import dependencies
import * as React from 'react'
import { render } from 'react-dom'

// Import components
import TodoForm from './components/todo-form'
import TodoList from './components/todo-list'

// Import interfaces
import { TodoInterface } from './interfaces'

// Import utils
import converter from './utils/converter'

// Import styles
import './styles/styles.css'

// TodoListApp component
const TodoListApp = () => {
  const [todos, setTodos] = React.useState<TodoInterface[]>([])

  // Creating new todo item
  function handleTodoCreate(molecule: TodoInterface) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = [...todos]

    // Convert Molecule to Atom
    const atoms = converter(molecule.text)

    // Update new todos state
    newTodosState.push({...molecule, text: atoms, isCorrect: !!atoms})

    // Update todos state
    setTodos(newTodosState)
  }

  // Remove existing todo item
  function handleTodoRemove(id: string) {
    // Prepare new todos state
    const newTodosState: TodoInterface[] = todos.filter((todo: TodoInterface) => todo.id !== id)

    // Update todos state
    setTodos(newTodosState)
  }

  return (
    <div className="todo-list-app">
      <TodoForm
        todos={todos}
        handleTodoCreate={handleTodoCreate}
      />

      <TodoList
        todos={todos}
        handleTodoRemove={handleTodoRemove}
      />
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<TodoListApp />, rootElement)
