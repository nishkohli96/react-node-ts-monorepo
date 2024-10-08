'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { LayoutProps } from '@/types';
import { getTheme } from './theme';

interface ThemeContextProps {
  currentTheme: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: 'light',
  toggleTheme: () => {}
});

export const useThemeContext = () => useContext(ThemeContext);

export const AppThemeProvider = ({ children }: LayoutProps ) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [currentTheme, setCurrentTheme] = useState<PaletteMode>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme as PaletteMode);
    } else {
      setCurrentTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const theme = useMemo(
    () => createTheme(getTheme(currentTheme)),
    [currentTheme]
  );

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
