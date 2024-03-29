import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MembetMain from 'module/member/page/MemberMain';
import App from './App';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app" element={<MembetMain />} />
        <Route path="/member" element={<MembetMain />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
