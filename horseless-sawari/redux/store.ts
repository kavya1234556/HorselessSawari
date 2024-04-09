import { configureStore } from '@reduxjs/toolkit';
import booking from './reducers/booking';
import location from './reducers/location';
import account from './reducers/account';
export const store = configureStore({
  reducer: {
    booking,
    location,
    account,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
