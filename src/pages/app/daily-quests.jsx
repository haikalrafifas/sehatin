import { useEffect, useState } from 'react';
import { getOrCreateTodayQuests, updateQuestStatus } from '../../utils/quest';

const DailyQuestsPage = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    setQuests(getOrCreateTodayQuests());
  }, []);

  const toggleQuest = (index) => {
    const updated = [...quests];
    updated[index].done = !updated[index].done;
    setQuests(updated);
    updateQuestStatus(index, updated[index].done);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="text-2xl font-bold text-primary mb-6 flex justify-between items-center">
        <h2>Tugas Harianmu</h2><h2>🎯</h2>
      </div>

      <ul className="space-y-4">
        {quests.map((q, i) => (
          <li
            key={i}
            className={`flex items-center gap-4 bg-white rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105 ${
              q.done ? 'bg-green-100' : 'bg-gray-50'
            }`}
            onClick={() => toggleQuest(i)}
          >
            <input
              type="checkbox"
              checked={q.done}
              onChange={() => toggleQuest(i)}
              className="accent-primary"
            />
            <span className={`text-sm font-medium ${q.done ? 'line-through text-gray-400' : ''}`}>
              {q.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyQuestsPage;
