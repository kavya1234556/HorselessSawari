import { configureStore } from '@reduxjs/toolkit';
import booking from './reducers/booking';
import location from './reducers/location';
import account from './reducers/account';
import payment_booking from './reducers/payment_booking';
export const store = configureStore({
  reducer: {
    booking,
    location,
    account,
    payment_booking,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
