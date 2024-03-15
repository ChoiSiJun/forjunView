import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MembetMain from 'module/member/page/MemberMain';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/member" element={<MembetMain />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
