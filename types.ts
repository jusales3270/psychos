
export type Screen = 'SPLASH' | 'QUIZ' | 'RESULT' | 'DASHBOARD' | 'CALCULATOR' | 'IMPULSE_BRAKE' | 'PANIC_MODE' | 'HISTORY' | 'GOALS';

export interface UserState {
  archetype: string;
  autonomyMonths: number;
  survivalCost: number;
  comfortCost: number;
  hourlyRate: number;
  freedomPathPercentage: number;
  futureLetter: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  statusText: string;
  options: {
    label: string;
    value: string;
  }[];
}

export interface HistoryItem {
  id: string;
  date: string;
  action: string;
  impact: string;
  outcome: 'paz' | 'friccao' | 'neutro';
}
