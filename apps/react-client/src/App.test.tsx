import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux-store';
import App from './App';

const ReactApp = () => (
  <Provider store={store}>
    <PersistGate loading={''} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

test('renders learn react link', () => {
  const { getByText } = render(<ReactApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
