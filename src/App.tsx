import TodoList from './components/TodoList';
import DarkModeContextProvider from './context/DarkModeContext';

export default function App(): JSX.Element {
  return (
    <DarkModeContextProvider>
      <TodoList />
    </DarkModeContextProvider>
  );
}
