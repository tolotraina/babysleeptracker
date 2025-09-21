import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { differenceInMinutes, format, parseISO } from 'date-fns';
import { nanoid } from 'nanoid';
import type { RootState } from '../../app/store';

// TYPES
export type SleepType = 'nap' | 'night';

export interface SleepEntry {
  id: string;
  start_time: string; // ISO string for serialization
  end_time: string;
  type: SleepType;
  notes?: string;
}

export interface SleepStatistics {
  totalDuration: number;
  averageDuration: number;
  napCount: number;
  nightCount: number;
}

interface SleepState {
  entries: SleepEntry[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// INITIAL STATE
const initialState: SleepState = {
  entries: [],
  status: 'idle',
  error: null,
};

// HELPER FUNCTIONS
const loadStateFromStorage = (): SleepEntry[] => {
  try {
    const serializedState = localStorage.getItem('sleepEntries');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return [];
  }
};

const saveStateToStorage = (entries: SleepEntry[]) => {
  try {
    const serializedState = JSON.stringify(entries);
    localStorage.setItem('sleepEntries', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};

// SLICE
export const sleepSlice = createSlice({
  name: 'sleep',
  initialState,
  reducers: {
    // Load entries from localStorage
    loadEntries: (state) => {
      state.status = 'loading';
      try {
        const storedEntries = loadStateFromStorage();
        state.entries = storedEntries;
        state.status = 'succeeded';
      } catch (error) {
        state.status = 'failed';
        state.error = error instanceof Error ? error.message : 'Failed to load entries';
      }
    },

    // Add a new sleep entry
    addEntry: {
      reducer: (state, action: PayloadAction<SleepEntry>) => {
        state.entries.push(action.payload);
        saveStateToStorage(state.entries);
      },
      prepare: (entryData: Omit<SleepEntry, 'id'>) => ({
        payload: {
          ...entryData,
          id: nanoid(),
        },
      }),
    },

    // Update an existing entry
    updateEntry: (state, action: PayloadAction<{ id: string; updates: Partial<SleepEntry> }>) => {
      const { id, updates } = action.payload;
      const index = state.entries.findIndex(entry => entry.id === id);
      
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...updates };
        saveStateToStorage(state.entries);
      }
    },

    // Delete an entry
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
      saveStateToStorage(state.entries);
    },

    // Clear all entries
    clearAllEntries: (state) => {
      state.entries = [];
      localStorage.removeItem('sleepEntries');
    },

    // Set error message
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
  },
});

// ACTIONS
export const { 
  loadEntries, 
  addEntry, 
  updateEntry, 
  deleteEntry, 
  clearAllEntries, 
  setError, 
  clearError 
} = sleepSlice.actions;

// SELECTORS
export const selectAllEntries = (state: RootState) => state.sleep.entries;
export const selectEntriesStatus = (state: RootState) => state.sleep.status;
export const selectEntriesError = (state: RootState) => state.sleep.error;

export const selectEntryById = (id: string) => 
  createSelector(
    [selectAllEntries],
    (entries) => entries.find(entry => entry.id === id)
  );

export const selectTotalEntries = createSelector(
  [selectAllEntries],
  (entries) => entries.length
);

export const selectTodayEntries = createSelector(
  [selectAllEntries],
  (entries) => {
    const today = new Date().toDateString();
    return entries.filter(entry => 
      new Date(entry.start_time).toDateString() === today
    );
  }
);

export const selectSleepStatistics = createSelector(
  [selectAllEntries],
  (entries): SleepStatistics => {
    if (entries.length === 0) {
      return { totalDuration: 0, averageDuration: 0, napCount: 0, nightCount: 0 };
    }

    const napEntries = entries.filter(entry => entry.type === 'nap');
    const nightEntries = entries.filter(entry => entry.type === 'night');

    const totalDuration = entries.reduce((total, entry) => {
      return total + differenceInMinutes(parseISO(entry.end_time), parseISO(entry.start_time));
    }, 0);

    return {
      totalDuration,
      averageDuration: totalDuration / entries.length,
      napCount: napEntries.length,
      nightCount: nightEntries.length,
    };
  }
);

// Helper function to calculate duration for a single entry
export const calculateDuration = (start_time: string, end_time: string): number => {
  return differenceInMinutes(parseISO(end_time), parseISO(start_time));
};

// Helper function to format duration for display
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${remainingMinutes}m`;
};

// Helper function to format date for display
export const formatSleepTime = (isoString: string): string => {
  return format(parseISO(isoString), 'MMM dd, yyyy - HH:mm');
};

export default sleepSlice.reducer;