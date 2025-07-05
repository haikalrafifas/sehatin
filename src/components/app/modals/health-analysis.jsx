import { useEffect, useState } from 'react';
import { getUserData, updateUserData } from '../../../utils/user';
import { calculateBMI, getSleepDuration } from '../../../utils/health-analysis';

const HealthAnalysis = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const user = getUserData();

  useEffect(() => {
    if (user?.settings?.autoShowHealthAnalysisModal) {
      updateUserData('settings', { autoShowHealthAnalysisModal: false });
    }

    const { body, habit, health } = user?.status;
    const bmiResult = calculateBMI(body.weight, body.height);
    const age = new Date().getFullYear() - new Date(body.dob).getFullYear();
    const sleepHours = getSleepDuration(habit.sleepFrom, habit.sleepTo);

    let analysis = [];

    // BMI
    if (bmiResult.label === 'Underweight') {
      analysis.push({
        title: 'Analisis BMI',
        icon: 'fas fa-heartbeat',
        color: 'bg-orange-400',
        message: `Anda tergolong <b>kurang berat badan</b> dengan BMI ${bmiResult.value.toFixed(1)}. Disarankan menambah asupan kalori harian.`
      });
    } else if (bmiResult.label === 'Overweight' || bmiResult.label === 'Obese') {
      const label = bmiResult.label === 'Overweight' ? 'kelebihan berat badan' : 'obesitas';
      analysis.push({
        title: 'Analisis BMI',
        icon: 'fas fa-heartbeat',
        color: 'bg-red-400',
        message: `Anda termasuk kategori <b>${label}</b> dengan BMI ${bmiResult.value.toFixed(1)}. Disarankan untuk mengatur pola makan dan olahraga.`
      });
    } else {
      analysis.push({
        title: 'Analisis BMI',
        icon: 'fas fa-heartbeat',
        color: 'bg-green-400',
        message: `Berat badan Anda <b>normal</b>. Pertahankan pola hidup sehat.`
      });
    }

    // Sleep
    if (sleepHours < 7) {
      analysis.push({
        title: 'Pola Tidur',
        icon: 'fas fa-bed',
        color: 'bg-orange-400',
        message: `Durasi tidur Anda hanya <b>${sleepHours.toFixed(1)} jam</b>. Orang usia <b>${age} tahun</b> sebaiknya tidur minimal <b>7-8 jam</b>.`
      });
    } else {
      analysis.push({
        title: 'Pola Tidur',
        icon: 'fas fa-bed',
        color: 'bg-green-400',
        message: `Durasi tidur Anda cukup (<b>${sleepHours.toFixed(1)} jam</b>).`
      });
    }

    // Smoking
    if (habit.smoke.active || habit.smoke.passive) {
      analysis.push({
        title: 'Asap Rokok',
        icon: 'fas fa-smoking',
        color: 'bg-red-400',
        message: `Anda terpapar asap rokok (aktif/pasif). Hindari paparan asap rokok untuk menjaga kesehatan paru-paru.`
      });
    }

    // Exercise
    if (habit.exercise.minutesPerWeek < 150) {
      analysis.push({
        title: 'Olahraga',
        icon: 'fas fa-dumbbell',
        color: 'bg-orange-400',
        message: `Aktivitas fisik <b>rendah</b>. Cobalah berolahraga minimal <b>150 menit/minggu</b>.`
      });
    } else {
      analysis.push({
        title: 'Olahraga',
        icon: 'fas fa-dumbbell',
        color: 'bg-green-400',
        message: `Tingkat aktivitas fisik Anda <b>cukup</b>.`
      });
    }

    // Illness
    if (health.illnesses.length > 0) {
      analysis.push({
        title: 'Penyakit',
        icon: 'fas fa-medkit',
        color: 'bg-red-400',
        message: `Anda memiliki riwayat penyakit: <b>${health.illnesses.join(', ')}</b>. Sehatin akan mempertimbangkan hal ini.`
      });
    } else {
      analysis.push({
        title: 'Penyakit',
        icon: 'fas fa-medkit',
        color: 'bg-green-400',
        message: `Tidak ditemukan riwayat penyakit. Tetap jaga kesehatan Anda!`
      });
    }

    setAnalysisData(analysis);
  }, [user]);

  return (
    <div className="space-y-4">
      {analysisData.map((item, index) => (
        <div key={index} className={`flex items-center p-4 rounded-lg shadow-md ${item.color}`}>
          <div className="mr-4 text-2xl text-white">
            <i className={item.icon}></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p
              className="text-white text-sm overflow-y-auto max-h-10"
              dangerouslySetInnerHTML={{ __html: item.message }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthAnalysis;
