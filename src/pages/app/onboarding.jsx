import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BodyStep from '../../components/app/onboarding-forms/body';
import HabitStep from '../../components/app/onboarding-forms/habit';
import HealthStep from '../../components/app/onboarding-forms/health';

const OnboardingPage = () => {
  const [page, setPage] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleFormComplete = () => {
    navigate('/app', { state: { from: location }, replace: true });
  };

  const forms = [
    <BodyStep next={() => setPage(1)} />,
    <HabitStep next={() => setPage(2)} />,
    <HealthStep next={() => handleFormComplete()} />,
  ];

  return <div className="p-4">{forms[page]}</div>;
};

export default OnboardingPage;
