import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContainer from '@ui-kit/containers/app/appContainer';

function LibertyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/liberty" element={<AppContainer />} />
      </Routes>
    </Router>
  );
}

export default LibertyRouter;
