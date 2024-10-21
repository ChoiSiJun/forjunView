import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import Dashboard from '@features/dashboard/components/template/Dashboard';
import MemberList from '@module/member/components/MemberList';
import LocationList from '@module/system/components/location/LocationList';
import ManagerList from '@module/system/components/manager/ManagerList';
import Login from '@features/login/Login';
import { ReactQueryDevtools } from 'react-query/devtools';

function LibertyRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="liberty/*" element={<AppContainer />}>
            <Route index element={<Dashboard />} />
            <Route path="dashBoard" element={<Dashboard />} />
            <Route path="member" element={<MemberList />} />
            <Route path="system/location" element={<LocationList />} />
            <Route path="system/manager" element={<ManagerList />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </>
  );
}

export default LibertyRouter;
