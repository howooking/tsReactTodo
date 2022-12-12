import { useState, useReducer, useEffect } from 'react';
import { Card, CardContent } from '@mui/material/';
import Header from './Header';
import SingleTodo from './SingleTodo';
import { Todo } from '../models/mode.todo';
import InputField from './InputField';
import todoReducer from '../reducer/todo.reducer';

function readTodosFromLocal(): Todo[] {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
const filters = ['All', 'Done', 'Not Done', 'Important'];

const filterd = (todos: Todo[], filter: string): Todo[] => {
  switch (filter) {
    case 'All':
      return todos;
    case 'Done':
      return todos.filter((todo) => todo.isDone === true);
    case 'Not Done':
      return todos.filter((todo) => todo.isDone === false);
    case 'Important':
      return todos.filter((todo) => todo.isImportant === true);
    default:
      throw Error('그런 필터 없다');
  }
};

export default function TodoList(): JSX.Element {
  const [todos, dispatch] = useReducer(todoReducer, readTodosFromLocal());
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (newTodo: Todo): void => {
    dispatch({ type: 'add', payload: { newTodo } });
  };
  const handleDelete = (deletedTodo: Todo): void => {
    dispatch({ type: 'delete', payload: { deletedTodo } });
  };
  const handleUpdate = (updatedTodo: Todo): void => {
    dispatch({ type: 'update', payload: { updatedTodo } });
  };
  return (
    <Card
      sx={{
        width: 500,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={2}
    >
      <Header filters={filters} filter={filter} setFilter={setFilter} />
      <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {filterd(todos, filter).map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </CardContent>
      <InputField onAdd={handleAdd} />
    </Card>
  );
}
