import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from 'dashboard/page/Dashboard';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
