import { configureStore } from '@reduxjs/toolkit';
import booking from './reducers/booking';
import location from './reducers/location';
export const store = configureStore({
  reducer: {
    booking,
    location,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
