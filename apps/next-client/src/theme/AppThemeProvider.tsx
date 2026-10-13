'use client';

import { createContext, useContext } from 'react';
import { ThemeProvider, useColorScheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { type PaletteMode } from '@mui/material';
import { theme } from './theme';
import { modeStorageKey, defaultTheme } from './constants';

interface ThemeContextProps {
  currentTheme: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  currentTheme: defaultTheme,
  toggleTheme: () => { /* no-op */ },
});

export const useThemeContext = () => useContext(ThemeContext);

/**
 * Must be nested inside ThemeProvider to call useColorScheme
 */
const ThemeContextBridge = ({ children }: { children: React.ReactNode }) => {
  const { mode, systemMode, setMode } = useColorScheme();
  const currentTheme = mode === 'system'
    ? systemMode ?? defaultTheme
    : mode ?? defaultTheme;

  const toggleTheme = () => {
    setMode(currentTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    theme={theme}
    defaultMode="system"
    modeStorageKey={modeStorageKey}
    disableTransitionOnChange
  >
    <CssBaseline enableColorScheme />
    <ThemeContextBridge>
      {children}
    </ThemeContextBridge>
  </ThemeProvider>
);
