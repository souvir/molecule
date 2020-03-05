// Import dependencies
import * as React from 'react'

// Import interfaces
import { TodoItemInterface } from './../interfaces'

// TodoItem component
const TodoItem = (props: TodoItemInterface) => {
  const { id, isCorrect, original } = props.todo
  const text = !!props.todo.text ? props.todo.text.split('\n').map((item, i) => <p key={i}>{item}</p>) : 'Error';
  return (
    <div className='todo-item'>
      <div>
        {isCorrect ? (
          <span className="todo-item-checked">&#x2714;</span>
        ) : (
          <span className="todo-item-unchecked">X</span>
        )}
      </div>

      <div className="todo-item-input-wrapper">
      <div > {original} ➔ </div>
      <div> {text} </div>
      </div>

      <div className="item-remove" onClick={() => props.handleTodoRemove(id)}>
        &#x02A2F;
      </div>
    </div>
  )
}

export default TodoItem
