import { createContext, useState, useContext } from 'react';

interface DarkModeContextProviderProp {
  children: React.ReactNode;
}
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});
export default function DarkModeContextProvider({
  children,
}: DarkModeContextProviderProp): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = (): void => {
    setDarkMode((prev) => !prev);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = (): DarkModeContextType =>
  useContext(DarkModeContext);
