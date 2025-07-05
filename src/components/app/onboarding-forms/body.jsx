import { useState } from 'react';
import { updateUserData } from '../../../utils/user';

const BodyForm = ({ next }) => {
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});

  // Validate inputs
  const validateForm = () => {
    let formErrors = {};
    if (!dob) formErrors.dob = 'Tanggal Lahir is required';
    if (!weight || weight <= 0) formErrors.weight = 'Berat badan harus lebih dari 0 kg';
    if (!height || height <= 0) formErrors.height = 'Tinggi badan harus lebih dari 0 cm';
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleNextForm = () => {
    if (!validateForm()) return; // Don't proceed if there are errors

    updateUserData('status', {
      body: { dob, weight: Number(weight), height: Number(height) },
    });
    next();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">Informasi Tubuh</h2>

      <div className="space-y-4">
        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={`input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.dob ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Berat (kg)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={`input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.weight ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan berat badan"
            required
          />
          {errors.weight && <p className="text-sm text-red-500 mt-1">{errors.weight}</p>}
        </div>

        {/* Height */}
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700">Tinggi (cm)</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={`input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.height ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Masukkan tinggi badan"
            required
          />
          {errors.height && <p className="text-sm text-red-500 mt-1">{errors.height}</p>}
        </div>

        {/* Next Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleNextForm}
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyForm;
