import { configureStore } from '@reduxjs/toolkit';
import booking from './reducers/booking';
export const store = configureStore({
  reducer: {
    booking,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
