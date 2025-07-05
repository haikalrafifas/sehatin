import { useState } from 'react';
import { updateUserData } from '../../../utils/user';

const HabitForm = ({ next }) => {
  const [sleepFrom, setSleepFrom] = useState('');
  const [sleepTo, setSleepTo] = useState('');
  const [smoke, setSmoke] = useState('none');
  const [passive, setPassive] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState(0);

  const handleNextForm = () => {
    updateUserData('status', {
      habit: {
        sleepFrom,
        sleepTo,
        smoke: {
          active: smoke === 'active',
          passive,
        },
        exercise: {
          minutesPerWeek: Number(exerciseDuration),
        },
      },
    });
    next();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center text-primary mb-6">Kebiasaan Sehari-hari</h2>

      <div className="space-y-6">
        {/* Sleep From */}
        <div>
          <label htmlFor="sleepFrom" className="block text-sm font-medium text-gray-700">Tidur dari</label>
          <input
            type="time"
            id="sleepFrom"
            value={sleepFrom}
            onChange={(e) => setSleepFrom(e.target.value)}
            className="input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
            required
          />
        </div>

        {/* Sleep To */}
        <div>
          <label htmlFor="sleepTo" className="block text-sm font-medium text-gray-700">Tidur sampai</label>
          <input
            type="time"
            id="sleepTo"
            value={sleepTo}
            onChange={(e) => setSleepTo(e.target.value)}
            className="input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
            required
          />
        </div>

        {/* Smoke */}
        <div>
          <label htmlFor="smoke" className="block text-sm font-medium text-gray-700">Apakah kamu merokok?</label>
          <select
            id="smoke"
            value={smoke}
            onChange={(e) => setSmoke(e.target.value)}
            className="input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
          >
            <option value="none">Tidak</option>
            <option value="active">Aktif</option>
          </select>
        </div>

        {/* Passive Smoking */}
        {(smoke === 'active' || smoke === 'none') && (
          <div>
            <label htmlFor="passive" className="block text-sm text-gray-700 mt-4">
              <input
                type="checkbox"
                id="passive"
                checked={passive}
                onChange={(e) => setPassive(e.target.checked)}
                className="mr-2"
              />
              Sering berada dekat perokok?
            </label>
          </div>
        )}

        {/* Exercise Duration */}
        <div>
          <label htmlFor="exerciseDuration" className="block text-sm font-medium text-gray-700 mt-4">
            Dalam seminggu, berapa total menit dihabiskan untuk berolahraga?
          </label>
          <input
            type="number"
            id="exerciseDuration"
            value={exerciseDuration}
            onChange={(e) => setExerciseDuration(e.target.value)}
            className="input w-full px-4 py-2 mt-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300"
            placeholder="Menit per minggu"
          />
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

export default HabitForm;
