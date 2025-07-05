import { useEffect, useState } from 'react';
import { getOrCreateTodayQuests, updateQuestStatus } from '../../utils/quest';

const DailyQuestsPage = () => {
  const [quests, setQuests] = useState([]);
  const [notified, setNotified] = useState(false);

  useEffect(() => {
    const questsToday = getOrCreateTodayQuests();
    setQuests(questsToday);

    if ('Notification' in window && Notification.permission === 'granted' && !notified) {
      new Notification('Hai, ini misi sehatmu hari ini!', {
        body: questsToday[0]?.text || 'Tetap sehat ya!',
      });
      setNotified(true);
    }
  }, []);

  const requestPermission = () => {
    alert('clicked');
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') alert('Notifikasi diaktifkan!');
      });
    }
  };

  const toggleQuest = (index) => {
    const updated = [...quests];
    updated[index].done = !updated[index].done;
    setQuests(updated);
    updateQuestStatus(index, updated[index].done);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">Tugas Harianmu 🎯</h2>
      <ul className="space-y-2">
        {quests.map((q, i) => (
          <li key={i} className="flex items-center gap-2 bg-gray-100 rounded px-4 py-2">
            <input type="checkbox" checked={q.done} onChange={() => toggleQuest(i)} />
            <span className={q.done ? 'line-through text-gray-400' : ''}>{q.text}</span>
          </li>
        ))}
      </ul>

      {'Notification' in window && Notification.permission !== 'granted' && (
        <button onClick={requestPermission} className="mt-6 text-sm text-blue-500 underline">
          Aktifkan Notifikasi Harian
        </button>
      )}
    </div>
  );
};

export default DailyQuestsPage;
