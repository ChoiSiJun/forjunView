import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import { ReactQueryDevtools } from 'react-query/devtools';
import Auth from 'pages/auth';
import { SiHistory } from 'pages/sihistory';
import { SmHistory } from 'pages/smhistory';
import Personal from 'pages/personal';

function ForjunRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="login" element={<Auth />} />
          <Route path="forjun/*" element={<AppContainer />}>
            <Route index element={<Personal />} />
            <Route path="personal-statement" element={<Personal />} />
            <Route path="si-history" element={<SiHistory />} />
            <Route path="sm-history" element={<SmHistory />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default ForjunRouter;
