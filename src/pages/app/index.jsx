import { useState } from 'react';
import { getUserData } from '../../utils/user';
import { getOrCreateTodayQuests } from '../../utils/quest';
import HealthAnalysis from '../../components/app/modals/health-analysis';
import Modal from '../../components/app/modal';

const DashboardPage = () => {
  getOrCreateTodayQuests();
  const user = getUserData();
  const [isModalOpen, setIsModalOpen] = useState(user?.settings?.autoShowHealthAnalysisModal);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="text-left whitespace-pre-wrap p-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Dashboard</h2>
        <Modal title="Analisa Kesehatan" show={isModalOpen} onClose={closeModal}>
          <HealthAnalysis />
        </Modal>
      </div>
      {/* <button onClick={next} className="mt-6 bg-primary text-white py-2 px-4 rounded">Lihat Tugas Harian</button> */}
    </div>
  );
};

export default DashboardPage;
