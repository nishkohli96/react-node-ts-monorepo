import { Suspense, useMemo } from 'react';
import { useAppSelector, ThemeSelector } from 'redux-store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppTheme from 'assets/styles/theme';
import { Loading } from 'shared';
import Routing from 'routes';

function App() {
  const mode = useAppSelector(ThemeSelector);
  const theme = useMemo(() => createTheme(AppTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Loading />}>
        <Routing />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
