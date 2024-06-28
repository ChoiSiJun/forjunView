import ReactDOM from 'react-dom/client';
import LibertyRouter from '@router';
import { Provider } from 'react-redux';
import { store } from '@config/ReduxStoreConfig';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '@common/components/common_components_index';

const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LibertyRouter />
    </PersistGate>
    <Toast.ReactToast />
  </Provider>,
);
