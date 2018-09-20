export const simulatedAnealing = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const svm = () => {
  return Math.random() > 0.5 ? 'up' : 'down';
}