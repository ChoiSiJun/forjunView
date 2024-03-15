import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from '@main_page/main';
import NotFound from '@main_page/etc/page/NotFound';
import MembetMain from 'module/member/page/MemberMain';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/member" element={<MembetMain />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
