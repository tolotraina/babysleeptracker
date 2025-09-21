import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type SleepEntry, type SleepState } from "./sleepDatas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sleepApi } from "./../../app/api";

export const fetchEntries = createAsyncThunk(
  'sleep/fetchEntries',
  async (_, { rejectWithValue }) => {
    try {
      const entries = await sleepApi.getEntries();
      console.log("Fetched sleep entries:", entries);
      return entries;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch entries');
    }
  }
);

export const sleepSlice = createSlice({
  name: "sleep",
  initialState: {
    entries: [],
    status: 'idle',
    error: null,
  } as SleepState,
  reducers: {
    addEntry: (state: SleepState, action: PayloadAction<SleepEntry>) => {
      console.log("Adding sleep entry:", action.payload);
      action.payload.id = selectNextId(state);
      state.entries.push(action.payload);
      console.log("Current sleep entries:", state.entries);
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchEntries
      .addCase(fetchEntries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

const selectNextId = (state: SleepState) => {
  if (!state.entries || state.entries.length === 0) return '1';
  const max = state.entries.reduce((m, e) => {
    const n = parseInt(e.id as string, 10);
    return Number.isFinite(n) ? Math.max(m, n) : m;
  }, 0);
  return String(max + 1);
};

export default sleepSlice.reducer;