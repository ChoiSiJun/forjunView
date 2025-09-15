import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import { ReactQueryDevtools } from 'react-query/devtools';
import Auth from 'pages/auth';
import { SiHistory } from 'pages/history/si';

import Personal from 'pages/personal';
import { SmHistory } from '@pages/history/sm';
import PrivatePage from '@pages/error';
import WebContainer from '@ui-kit/app/webContainer';
import { OpenSiHistory } from '@pages/web/history/si';
import { OpenSmHistory } from '@pages/web/history/sm';

function ForjunRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="login" element={<Auth />} />
          <Route path="forjun/*" element={<AppContainer />}>
            <Route index element={<Personal />} />
            <Route path="personal" element={<Personal />} />
            <Route path="history/si" element={<SiHistory />} />
            <Route path="history/sm" element={<SmHistory />} />
          </Route>
          <Route path="web/:userId?/profile" element={<WebContainer />}>
            <Route path="history/si" element={<OpenSiHistory />} />
            <Route path="history/sm" element={<OpenSmHistory />} />
          </Route>
          <Route path="error" element={<PrivatePage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default ForjunRouter;
