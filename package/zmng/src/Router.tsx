import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from 'routerLayout/appLayout';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/liberty" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
