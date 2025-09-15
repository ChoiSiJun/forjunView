import ReactDOM from 'react-dom/client';
import ForjunRouter from '@router';
import { Provider } from 'react-redux';
import { store } from 'store/ReduxStoreConfig';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-toastify/dist/ReactToastify.css';
import Toast from '@common/ui/elements/feedback/ReactToast';

import { QueryClientProvider, QueryClient } from 'react-query';
import Modal from '@common/ui/modules/Modal';
// import useApiError from "@module/common/hook/useApiError";

const persistor = persistStore(store);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <ForjunRouter />
      </PersistGate>
      <Toast />
      <Modal />
    </QueryClientProvider>
  </Provider>,
);
