export const simulatedAnealing = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const svm = (): string => {
  return Math.random() > 0.5 ? 'up' : 'down';
}

export const naiveBayes = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}