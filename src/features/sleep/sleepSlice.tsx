import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type SleepEntry, type SleepState } from "./sleepDatas";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { sleepApi } from "./../../app/api";

export const fetchEntries = createAsyncThunk(
  'sleep/fetchEntries',
  async (_, { rejectWithValue }) => {
    try {
      const entries = await sleepApi.getEntries();
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
      state.entries.push(action.payload);
    },
    editEntry: (state: SleepState, action: PayloadAction<SleepEntry>) => {
      const index = state.entries.findIndex(entry => parseInt(entry.id) === parseInt(action.payload.id));
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state: SleepState, action: PayloadAction<number>) => {
      state.entries = state.entries.filter(entry => parseInt(entry.id) !== action.payload);
      if (state.entries.length === 0) {
        state.status = 'idle';
      }
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

export default sleepSlice.reducer;