import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import configureStore from 'store';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();


render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


