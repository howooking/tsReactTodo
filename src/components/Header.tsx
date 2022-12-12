import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material/';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useDarkMode } from '../context/DarkModeContext';

interface HeaderProps {
  filters: string[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

type IsSelectedType = {
  opacity: number;
};
const isSelected = (value: string, filter: string): IsSelectedType => {
  if (value === filter) {
    return { opacity: 1 };
  }
  return { opacity: 0.5 };
};

export default function Header({
  filters,
  filter,
  setFilter,
}: HeaderProps): JSX.Element {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <AppBar
      position="static"
      elevation={1}
      color={darkMode ? 'secondary' : 'primary'}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Todo
        </Typography>
        {filters.map((value, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="contained"
            disableElevation
            onClick={() => setFilter(value)}
            sx={isSelected(value, filter)}
            color={darkMode ? 'secondary' : 'primary'}
          >
            {value}
          </Button>
        ))}
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? (
            <WbSunnyIcon sx={{ color: 'red' }} />
          ) : (
            <DarkModeIcon sx={{ color: 'yellow' }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
