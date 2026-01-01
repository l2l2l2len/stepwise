
export interface SM2Result {
  interval: number;
  repetitions: number;
  easeFactor: number;
}

/**
 * SuperMemo 2 (SM-2) Algorithm
 * @param quality 0-5 (5: perfect, 0: total blackout)
 * @param repetitions Number of times correctly reviewed
 * @param easeFactor Default is 2.5
 * @param interval Current interval in days
 */
export const calculateSM2 = (
  quality: number,
  repetitions: number,
  easeFactor: number,
  interval: number
): SM2Result => {
  let nextRepetitions = 0;
  let nextInterval = 0;
  let nextEaseFactor = easeFactor;

  if (quality >= 3) {
    if (repetitions === 0) {
      nextInterval = 1;
    } else if (repetitions === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(interval * easeFactor);
    }
    nextRepetitions = repetitions + 1;
  } else {
    nextRepetitions = 0;
    nextInterval = 1;
  }

  nextEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (nextEaseFactor < 1.3) nextEaseFactor = 1.3;

  return {
    interval: nextInterval,
    repetitions: nextRepetitions,
    easeFactor: nextEaseFactor
  };
};
