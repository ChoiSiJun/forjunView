import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import { ReactQueryDevtools } from 'react-query/devtools';
import AuthMain from '@module/auth/AuthMain';
import { SiHistory } from '@module/history/SiHistory';
import { SmHistory } from '@module/history/SmHistory';
import PersonalStatement from '@module/personal/PersonalStatement';

function LibertyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthMain />} />
          <Route path="login" element={<AuthMain />} />
          <Route path="liberty/*" element={<AppContainer />}>
            <Route index element={<PersonalStatement />} />
            <Route path="personal-statement" element={<PersonalStatement />} />
            <Route path="si-history" element={<SiHistory />} />
            <Route path="sm-history" element={<SmHistory />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default LibertyRouter;
