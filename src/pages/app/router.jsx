import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, getUserStatus } from '../../utils/user';
import { getOrCreateTodayQuests, updateQuestStatus } from '../../utils/quest';

import TopBar from '../../components/app/layouts/topbar';
import NavBar from '../../components/app/layouts/navbar';

import OnboardingPage from './onboarding';
import DashboardPage from './';
import DailyQuestsPage from './daily-quests';
import SettingsPage from './settings';
import NotFoundPage from '../not-found';

const AppLayout = ({ children }) => (
  <><TopBar />{children}<NavBar /></>
);

const AppRouter = () => {
  const username = getCurrentUser();
  const location = useLocation();
  
  // prevent unauthenticated user
  if (!username) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const [isOnboarding, setIsOnboarding] = useState(true);
  const navigate = useNavigate();
  const personalizedUser = getUserStatus(username);

  // separate between onboarding and personalized user
  useEffect(() => {
    if (personalizedUser) {
      // is personalized
      setIsOnboarding(false);
      if (location.pathname === '/app/onboarding') {
        navigate('/app', { state: { from: location }, replace: true });
      }
    } else {
      // is onboarding
      if (location.pathname !== '/app/onboarding') {
        navigate('/app/onboarding', { state: { from: location }, replace: true });
      }
    }
  }, [username, location, navigate]);
  
  const [notified, setNotified] = useState(false);
  // Check if Notification permission is granted
  const checkNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') {
          triggerNotification();
        }
      });
    }
  };
  // Function to trigger notification
  const triggerNotification = () => {
    const questsToday = getOrCreateTodayQuests();
    if (  'Notification' in window && Notification.permission === 'granted' && !notified) {
      new Notification('Hai, ini misi sehatmu hari ini!', {
        body: questsToday[0]?.text || 'Tetap sehat ya!',
      });
      setNotified(true);
    }
  };
  useEffect(() => {
    if (personalizedUser) {
      getOrCreateTodayQuests();
      if ('Notification' in window && Notification.permission === 'default') {
        checkNotificationPermission();
      } else {
        triggerNotification();
      }
    }
  }, []);

  return isOnboarding
  ? (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
    </Routes>
  )
  : (
    <AppLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/daily-quests" element={<DailyQuestsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRouter;
