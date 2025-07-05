import { useState } from 'react';
import { updateUserData } from '../../../utils/user';

const illnessList = ['Hipertensi', 'Diabetes', 'Asma', 'Kanker', 'Jantung'];

const HealthForm = ({ next }) => {
  const [illnesses, setIllnesses] = useState([]);

  const toggleIllness = (name) => {
    setIllnesses((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleNextStep = () => {
    updateUserData('status', { health: { illnesses } });
    next();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-primary mb-4">Riwayat Penyakit</h2>
      <p className="text-sm text-center text-gray-600 mb-6">
        Penyakit apa saja yang pernah kamu alami?
      </p>

      {/* Illness Checkboxes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {illnessList.map((ill) => (
          <label key={ill} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={illnesses.includes(ill)}
              onChange={() => toggleIllness(ill)}
              className="h-5 w-5 text-primary border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
            <span className="text-sm text-gray-700">{ill}</span>
          </label>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleNextStep}
          className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};

export default HealthForm;
