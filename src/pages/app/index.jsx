import { useEffect, useState } from 'react';
import { getUserData } from '../../utils/user';
import { getOrCreateTodayQuests } from '../../utils/quest';
import HealthAnalysis from '../../components/app/modals/health-analysis';
import Modal from '../../components/app/modal';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const user = getUserData();
  const [quests, setQuests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(user?.settings?.autoShowHealthAnalysisModal);
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [exerciseMinutes, setExerciseMinutes] = useState(0);

  useEffect(() => {
    setQuests(getOrCreateTodayQuests())

    const rootStyles = getComputedStyle(document.documentElement);
    const colorPrimary = rootStyles.getPropertyValue('--color-primary').trim();
    if (colorPrimary) {
      setPrimaryColor(colorPrimary);
    }

    if (user?.status?.habit?.exercise?.minutesPerWeek) {
      setExerciseMinutes(user.status.habit.exercise.minutesPerWeek);
    }
  }, []);

  const closeModal = () => setIsModalOpen(false);

  const getDateLabels = () => {
    const labels = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      labels.push(date.getDate());
    }
    return labels;
  };

  const progressData = {
    labels: getDateLabels(),
    datasets: [
      {
        label: 'Kebugaran',
        data: [0, 2, 4, 6, 8],
        borderColor: primaryColor,
        backgroundColor: primaryColor,
        borderRadius: 8,
        barThickness: 15,
        maxBarThickness: 30,
      },
    ],
  };

  const progressOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        display: false,
      },
    },
  };

  // Insights (cards) data
  const insights = [
    { title: 'Tugas Terselesaikan', value: quests.filter(q => q.done).length },
    { title: 'Tugas Tersisa', value: quests.length - quests.filter(q => q.done).length },
    { title: 'Frekuensi Olahraga', value: exerciseMinutes ? `${exerciseMinutes} <small>menit per minggu</small>` : 'Belum diatur' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="text-left whitespace-pre-wrap flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary">Aktivitas</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark"
        >
          Lihat Analisis
        </button>
      </div>

      {/* Progress Visualization (Chart) */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <Bar data={progressData} options={progressOptions} />
      </div>

      {/* Insights Section (Cards) */}
      <div className="mt-6 space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-primary">{insight.title}</h4>
            <p className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: insight.value }}></p>
          </div>
        ))}
      </div>

      {/* Health Analysis Modal */}
      <Modal title="Analisis Kesehatan" show={isModalOpen} onClose={closeModal}>
        <HealthAnalysis />
      </Modal>
    </div>
  );
};

export default DashboardPage;
