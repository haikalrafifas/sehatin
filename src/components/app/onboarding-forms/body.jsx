import { useState } from 'react';
import { updateUserData } from '../../../utils/user';

const BodyForm = ({ next }) => {
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleNextForm = () => {
    updateUserData('status', {
      body: { dob, weight: Number(weight), height: Number(height) },
    });
    next();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Informasi Tubuh</h2>
      <input
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="input"
        placeholder="Tanggal Lahir"
        autoFocus={true}
        required={true}
      />
      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="input"
        placeholder="Berat (kg)"
        required={true}
      />
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="input"
        placeholder="Tinggi (cm)"
        required={true}
      />
      <button
        onClick={handleNextForm}
        className="bg-primary text-black py-2 px-4 rounded mt-4"
      >
        Lanjut
      </button>
    </div>
  );
};

export default BodyForm;
