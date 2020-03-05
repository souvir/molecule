// Todo interface
export interface TodoInterface {
  id: string;
  text: string;
  isCorrect: boolean;
  original: string;
}

// Todo form interface
export interface TodoFormInterface {
  todos: TodoInterface[];
  handleTodoCreate: (todo: TodoInterface) => void;
}

// Todo list interface
export interface TodoListInterface {
  handleTodoRemove: (id: string) => void;
  todos: TodoInterface[];
}

// Todo item interface
export interface TodoItemInterface {
  handleTodoRemove: (id: string) => void;
  todo: TodoInterface;
}
