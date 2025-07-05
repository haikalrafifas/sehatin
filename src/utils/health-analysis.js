export function calculateBMI(weight, height) {
  const h = height / 100; // convert to meters
  const bmi = weight / (h * h);
  if (bmi < 18.5) return { label: 'Underweight', value: bmi };
  if (bmi < 25) return { label: 'Normal', value: bmi };
  if (bmi < 30) return { label: 'Overweight', value: bmi };
  return { label: 'Obese', value: bmi };
}

export function getSleepDuration(from, to) {
  const [fh, fm] = from.split(':').map(Number);
  const [th, tm] = to.split(':').map(Number);
  const fromMins = fh * 60 + fm;
  const toMins = th * 60 + tm + (to < from ? 1440 : 0); // cross midnight
  const diff = (toMins - fromMins) / 60;
  return diff;
}
