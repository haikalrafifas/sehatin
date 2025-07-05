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
    <div>
      <h2 className="text-xl font-bold mb-4">Riwayat Penyakit</h2>
      <p className="mb-2">Penyakit apa saja yang pernah kamu alami?</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {illnessList.map((ill) => (
          <label key={ill} className="flex items-center gap-2">
            <input type="checkbox" checked={illnesses.includes(ill)} onChange={() => toggleIllness(ill)} />
            {ill}
          </label>
        ))}
      </div>

      <button
        onClick={handleNextStep}
        className="bg-primary text-black py-2 px-4 rounded mt-4"
      >
        Selesai
      </button>
    </div>
  );
};

export default HealthForm;
