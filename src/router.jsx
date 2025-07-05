import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages';
import AuthRouter from './pages/auth/router';
import AppRouter from './pages/app/router';
import NotFoundPage from './pages/not-found';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/app/*" element={<AppRouter />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
