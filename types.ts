
export interface MathStep {
  operation: string;
  explanation: string;
  simplifiedExplanation: string;
}

export interface SolverResult {
  problem: string;
  finalAnswer: string;
  steps: MathStep[];
  intuition: string;
  commonMistakes: string[];
  timestamp: number;
}

export interface RecallCard {
  id: string;
  type: 'formula' | 'shortcut' | 'concept' | 'trap' | 'mnemonic';
  front: string;
  back: string;
  category: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReviewDate: number;
  mastered: boolean;
}

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
