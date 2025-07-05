import { getUserStatus, getUserDailyQuestsByDate, updateUserDailyQuest, updateUserData } from './user';

const TODAY = new Date().toISOString().slice(0, 10);

/**
 * Generates daily quest
 * 
 * @returns Array
 */
const generateQuests = () => {
  const { body, habit, health } = getUserStatus();
  const quests = [];

  // Underweight
  const heightM = body.height / 100;
  const bmi = body.weight / (heightM * heightM);
  if (bmi < 18.5) quests.push('Tambah 1 snack sehat hari ini 🍌');

  // Sleep
  const [fromH, fromM] = habit.sleepFrom.split(':').map(Number);
  const [toH, toM] = habit.sleepTo.split(':').map(Number);
  let sleepDuration = ((toH * 60 + toM) - (fromH * 60 + fromM) + 1440) % 1440;
  sleepDuration /= 60;
  if (sleepDuration < 7) quests.push('Tidur lebih awal 30 menit hari ini 💤');

  // Smoking
  if (habit.smoke.active || habit.smoke.passive) {
    quests.push('Hindari area merokok minimal 3 jam 🚭');
  }

  // Low exercise
  if (habit.exercise.level === 'low') {
    quests.push('Lakukan stretching 10 menit pagi ini 🧘‍♀️');
  }

  // Illnesses
  if (health.illnesses.length > 0) {
    quests.push('Minum cukup air hari ini (minimal 8 gelas) 💧');
  }

  return quests;
};

/**
 * Get or create today's daily quests
 * 
 * @returns Object
 */
export const getOrCreateTodayQuests = () => {
  const todayQuests = getUserDailyQuestsByDate(TODAY);

  if (todayQuests) return todayQuests;

  const quests = generateQuests().map(text => ({ text, done: false }));

  updateUserData('daily_quests', { [TODAY]: quests });
  return quests;
};

/**
 * Updates daily quest status after interacted
 * 
 * @param {*} index 
 * @param {*} done 
 * @returns void
 */
export const updateQuestStatus = (index, done) => {
  const dailyQuest = getUserDailyQuestsByDate(TODAY);
  if (!dailyQuest || !dailyQuest[index]) return;

  const data = { done };
  updateUserDailyQuest(TODAY, index, data);
};
