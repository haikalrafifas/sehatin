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
    <div>
      <h2 className="text-xl font-bold mb-4">Kebiasaan Sehari-hari</h2>
      <label className="block mb-2">Tidur dari:</label>
      <input
        type="time"
        value={sleepFrom}
        onChange={(e) => setSleepFrom(e.target.value)}
        className="input"
        autoFocus={true}
        required={true}
      />
      <label className="block mt-2">Tidur sampai:</label>
      <input
        type="time"
        value={sleepTo}
        onChange={(e) => setSleepTo(e.target.value)}
        className="input"
        required={true}
      />

      <label className="block mt-4">Apakah kamu merokok?</label>
      <select
        value={smoke}
        onChange={(e) => setSmoke(e.target.value)}
        className="input"
      >
        <option value="none">Tidak</option>
        <option value="active">Aktif</option>
      </select>

      {smoke === 'active' || smoke === 'none' ? (
        <label className="block mt-2">
          <input
            type="checkbox"
            checked={passive}
            onChange={(e) => setPassive(e.target.checked)}
          />
          {' '}Sering berada dekat perokok?
        </label>
      ) : null}

      <label className="block mt-4">Dalam seminggu, berapa total menit dihabiskan untuk berolahraga?</label>
      <input
        type="number"
        value={exerciseDuration}
        onChange={(e) => setExerciseDuration(e.target.value)}
        className="input mt-2"
        placeholder="Menit per minggu"
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

export default HabitForm;
