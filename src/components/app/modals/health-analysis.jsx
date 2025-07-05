import { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../../../utils/user';
import { calculateBMI, getSleepDuration } from '../../../utils/health-analysis';

const HealthAnalysis = () => {
  const [message, setMessage] = useState('');
  const user = getUserData();

  useEffect(() => {
    if (user?.settings?.autoShowHealthAnalysisModal) {
      updateUserData('settings', { autoShowHealthAnalysisModal: false });
    }

    const { body, habit, health } = user?.status;

    const bmiResult = calculateBMI(body.weight, body.height);
    const age = new Date().getFullYear() - new Date(body.dob).getFullYear();
    const sleepHours = getSleepDuration(habit.sleepFrom, habit.sleepTo);

    let analysis = `Halo ${user?.profile?.nickname}! Berdasarkan hasil analisa, menurut WHO:\n\n`;

    // BMI
    if (bmiResult.label === 'Underweight') {
      analysis += `• Anda tergolong *underweight* dengan BMI ${bmiResult.value.toFixed(1)}. Disarankan menambah asupan kalori harian.\n`;
    } else if (bmiResult.label === 'Overweight' || bmiResult.label === 'Obese') {
      analysis += `• Anda termasuk kategori *${bmiResult.label}* dengan BMI ${bmiResult.value.toFixed(1)}. Disarankan untuk mengatur pola makan dan olahraga.\n`;
    } else {
      analysis += `• Berat badan Anda normal. Pertahankan pola hidup sehat.\n`;
    }

    // Sleep
    if (sleepHours < 7) {
      analysis += `• Durasi tidur Anda hanya ${sleepHours.toFixed(1)} jam. Orang usia ${age} tahun sebaiknya tidur minimal 7–8 jam.\n`;
    } else {
      analysis += `• Durasi tidur Anda cukup (${sleepHours.toFixed(1)} jam).\n`;
    }

    // Smoking
    if (habit.smoke.active || habit.smoke.passive) {
      analysis += `• Anda terpapar asap rokok (aktif/pasif). Hindari paparan asap rokok untuk menjaga kesehatan paru-paru.\n`;
    }

    // Exercise
    if (habit.exercise.minutesPerWeek < 150) {
      analysis += `• Aktivitas fisik rendah. Cobalah berolahraga minimal 150 menit/minggu.\n`;
    } else {
      analysis += `• Tingkat aktivitas fisik Anda cukup.\n`;
    }

    // Illness
    if (health.illnesses.length > 0) {
      analysis += `• Anda memiliki riwayat penyakit: ${health.illnesses.join(', ')}. Sehatin akan memberikan saran berdasarkan ini.\n`;
    } else {
      analysis += `• Tidak ditemukan riwayat penyakit. Tetap jaga kesehatan Anda!\n`;
    }

    setMessage(analysis);
  }, []);

  return <p className="text-gray-700 text-sm leading-relaxed">{message}</p>;
};

export default HealthAnalysis;
