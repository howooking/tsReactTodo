import {
  Box,
  Checkbox,
  FormLabel,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Todo } from '../models/mode.todo';
import { useDarkMode } from '../context/DarkModeContext';

type SingleTodoProps = {
  todo: Todo;
  onDelete: (deletedTodo: Todo) => void;
  onUpdate: (updatedTodo: Todo) => void;
};

export default function SingleTodo({
  todo,
  onDelete,
  onUpdate,
}: SingleTodoProps): JSX.Element {
  const { darkMode } = useDarkMode();
  const handleDelete = (): void => {
    onDelete(todo);
  };
  const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const isDone = !!event?.target.checked;
    onUpdate({ ...todo, isDone });
  };
  const handleImportantUpdate = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const isImportant = !!event?.target.checked;
    onUpdate({ ...todo, isImportant });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Checkbox
        id={todo.id}
        checked={todo.isDone}
        onChange={handleUpdate}
        color={darkMode ? 'secondary' : 'primary'}
      />
      <FormLabel htmlFor={todo.id} sx={{ flexGrow: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: '700' }}>
          {todo.task}
        </Typography>
      </FormLabel>
      <IconButton
        onClick={handleDelete}
        color={darkMode ? 'secondary' : 'primary'}
      >
        <DeleteIcon />
      </IconButton>
      <Checkbox
        icon={<StarBorderIcon sx={{ color: 'inherit' }} />}
        checkedIcon={<StarIcon sx={{ color: 'orange' }} />}
        checked={todo.isImportant}
        onChange={handleImportantUpdate}
      />
    </Box>
  );
}
