export const LEVELS = [
  "Noobie", "Novice", "Intermediate", "Advanced", "Expert"
];

// min, max inclusive
function randomNoise(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const SCORE_TYPES = {
  PARTSCORE: 'PARTSCORE',
  GAME: 'GAME',
  SMALLSLAM: 'SMALLSLAM',
  GRANDSLAM: 'GRANDSLAM',
}

export function getCoinsFromScore(score, score_type) {
  if (score <= -200) return 6 + randomNoise(0, 4);
  if (score <= -100) return 10 + randomNoise(0, 4);
  if (score < 0) return 14 + randomNoise(0, 4);
  if (score === 0) return 0;
  if (score_type === SCORE_TYPES.PARTSCORE) return 20 + randomNoise(0, 10);
  if (score_type === SCORE_TYPES.GAME) return 70 + randomNoise(0, 20);
  if (score_type === SCORE_TYPES.SMALLSLAM) return 300 + randomNoise(0, 50);
  if (score_type === SCORE_TYPES.GRANDSLAM) return 600 + randomNoise(0, 200);
  return 0;
}
export function getExpFromScore(score, score_type) {
  if (score <= -200) return 20 + randomNoise(0, 10);
  if (score <= -100) return 30 + randomNoise(0, 20);
  if (score < 0) return 50 + randomNoise(0, 20);
  if (score === 0) return 0;
  if (score_type === SCORE_TYPES.PARTSCORE) return 100 + randomNoise(0, 50);
  if (score_type === SCORE_TYPES.GAME) return 350 + randomNoise(0, 100);
  if (score_type === SCORE_TYPES.SMALLSLAM) return 1500 + randomNoise(0, 250);
  if (score_type === SCORE_TYPES.GRANDSLAM) return 3000 + randomNoise(0, 1000);
  return 0;
}
