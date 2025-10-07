
export type SleepType = 'nap' | 'night';

export interface SleepEntry {
  id: string;
  start_time: string; // ISO string for serialization
  end_time: string;
  type: SleepType;
  note?: string;
}

export interface SleepState {
  entries: SleepEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}