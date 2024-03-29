import React from 'react';
import ReactDOM from 'react-dom/client';
import LibertyRouter from '@router';
import { Provider } from 'react-redux';
import { store } from '@config/ReduxStoreConfig';

import 'react-toastify/dist/ReactToastify.css';
import { ReactToast } from '@common_components_ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <LibertyRouter />
      <ReactToast />
    </React.StrictMode>
  </Provider>,
);
