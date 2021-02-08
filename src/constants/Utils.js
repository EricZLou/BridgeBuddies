// min, max inclusive
export function randomNoise(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
