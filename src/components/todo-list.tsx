// Import dependencies
import * as React from 'react'

// Import TodoItem
import TodoItem from './todo-item'

// Import interfaces
import { TodoListInterface } from './../interfaces'

// TodoList component
const TodoList = (props: TodoListInterface) => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem
              todo={todo}
              handleTodoRemove={props.handleTodoRemove}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
