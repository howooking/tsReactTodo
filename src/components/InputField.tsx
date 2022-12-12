import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Todo } from '../models/mode.todo';
import { useDarkMode } from '../context/DarkModeContext';

type InputFieldProps = {
  onAdd: (newTodo: Todo) => void;
};
export default function InputField({ onAdd }: InputFieldProps): JSX.Element {
  const [todoInput, setTodoInput] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const { darkMode } = useDarkMode();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    const newTodo = {
      id: `${Date.now()}`,
      task: todoInput,
      isDone: false,
      isImportant: false,
    };
    event.preventDefault();
    if (todoInput.trim()) {
      onAdd(newTodo);
      setIsEmpty(false);
      setTodoInput('');
    } else {
      setTodoInput('');
      setIsEmpty(true);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        m: 2,
        display: 'flex',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Todo"
        variant="outlined"
        sx={{ width: '80%' }}
        value={todoInput}
        onChange={handleChange}
        color={darkMode ? 'secondary' : 'primary'}
        error={isEmpty}
        required={!!isEmpty}
      />
      <Button
        variant="contained"
        sx={{ width: '20%', marginLeft: 1 }}
        onClick={handleSubmit}
        color={darkMode ? 'secondary' : 'primary'}
      >
        Add
      </Button>
    </Box>
  );
}
