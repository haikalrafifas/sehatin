import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../utils/user';

import LoginPage from './login';
import RegisterPage from './register';
import NotFoundPage from '../not-found';

const AuthRouter = () => {
  const isAuthenticated = getCurrentUser();
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/app" state={{ from: location }} replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AuthRouter;
