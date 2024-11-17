import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthMain from '@module/auth/AuthMain';

function LibertyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthMain />} />
          <Route path="login" element={<AuthMain />} />
          <Route path="liberty/*" element={<AppContainer />}>
            {/* <Route index element={<Dashboard />} />
            <Route path="dashBoard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default LibertyRouter;
