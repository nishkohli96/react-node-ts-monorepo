import { Suspense, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux-store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppTheme from 'assets/styles/theme';
import { Loading } from 'shared';
import Routing from 'routes';

function App() {
  const mode = 'dark';
  const theme = useMemo(() => createTheme(AppTheme(mode)), [mode]);

  return (
    <Provider store={store}>
      <PersistGate loading={''} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Loading />}>
            <Routing />
          </Suspense>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
