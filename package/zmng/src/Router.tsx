import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/app/appContainer';
import Dashboard from '@features/dashboard/components/template/Dashboard';
import MemberList from '@module/member/components/MemberList';
import TemplateGuide from '@template/index';
import BuilderLayout from '@module/cms/builder/components/BuilderLayout';
import Login from '@features/login/Login';
function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/builder" element={<BuilderLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="template/Guide" element={<TemplateGuide />} />
        <Route path="liberty/*" element={<AppContainer />}>
          <Route index element={<Dashboard />} />
          <Route path="dashBoard" element={<Dashboard />} />
          <Route path="member" element={<MemberList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
