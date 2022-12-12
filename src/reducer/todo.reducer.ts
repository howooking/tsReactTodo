import { Todo } from '../models/mode.todo';

interface AddAction {
  type: 'add';
  payload: { newTodo: Todo };
}
interface DeleteAction {
  type: 'delete';
  payload: { deletedTodo: Todo };
}
interface UpdateAction {
  type: 'update';
  payload: { updatedTodo: Todo };
}

export default function todoReducer(
  todos: Todo[],
  action: AddAction | DeleteAction | UpdateAction
): Todo[] {
  switch (action.type) {
    case 'add': {
      const { newTodo } = action.payload;
      return [...todos, newTodo];
    }
    case 'delete': {
      const { deletedTodo } = action.payload;
      return todos.filter((todo) => todo.id !== deletedTodo.id);
    }
    case 'update': {
      const { updatedTodo } = action.payload;
      return todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    }
    default: {
      return todos;
    }
  }
}
