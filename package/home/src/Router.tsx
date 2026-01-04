import { Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import { ReactQueryDevtools } from 'react-query/devtools';
import Auth from 'pages/auth';
import { SiHistory } from 'pages/history/si';

import Personal from 'pages/personal';
import { SmHistory } from '@pages/history/sm';
import { RndHistory } from '@pages/history/rnd';
import PrivatePage from '@pages/error';
import WebContainer from '@ui-kit/app/webContainer';
import { OpenSiHistory } from '@pages/web/history/si';
import { OpenSmHistory } from '@pages/web/history/sm';
import { OpenRndHistory } from '@pages/web/history/rnd';
import UserEdit from '@pages/user/edit';

function ForjunRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="login" element={<Auth />} />
        <Route path="forjun/*" element={<AppContainer />}>
          <Route index element={<Personal />} />
          <Route path="personal" element={<Personal />} />
          <Route path="user/edit" element={<UserEdit />} />
          <Route path="history/si" element={<SiHistory />} />
          <Route path="history/sm" element={<SmHistory />} />
          <Route path="history/rnd" element={<RndHistory />} />
        </Route>
        <Route path="web/:userId?/profile" element={<WebContainer />}>
          <Route path="history/si" element={<OpenSiHistory />} />
          <Route path="history/sm" element={<OpenSmHistory />} />
          <Route path="history/rnd" element={<OpenRndHistory />} />
        </Route>
        <Route path="error" element={<PrivatePage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default ForjunRouter;
