import React from 'react';
import ReactDOM from 'react-dom/client';
import LibertyRouter from '@router';
import { Provider } from 'react-redux';
import { store } from '@config/ReduxStoreConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <LibertyRouter />
    </React.StrictMode>
  </Provider>,
);
