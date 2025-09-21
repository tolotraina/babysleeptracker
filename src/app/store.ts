import { configureStore } from '@reduxjs/toolkit';
import sleepReducer from '../features/sleep/sleepSlice';

export const store = configureStore({
  reducer: {
    sleep: sleepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;