
export type SleepType = 'nap' | 'night';

export interface SleepEntry {
  id: string;
  start_time: string; // ISO string for serialization
  end_time: string;
  type: SleepType;
  notes?: string;
}

export interface SleepState {
  entries: SleepEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// export const initialEntries: SleepEntry[] = [
//     {
//       id: '1',
//       start_time: new Date().toISOString(),
//       end_time: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString(),
//       type: 'night',
//       notes: 'Slept well',
//     },
//     {
//       id: '2',
//       start_time: new Date().toISOString(),
//       end_time: new Date(new Date().getTime() + 1 * 60 * 60 * 1000 + 30 * 1000 * 60).toISOString(),
//       type: 'nap',
//       notes: 'Took a short nap',
//     },
//   ];