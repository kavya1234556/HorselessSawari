import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: PaymentBookingState;
};
type PaymentBookingState = {
  car_booked_id: Number;
};

const initialState = {
  value: {
    car_booked_id: 0,
  } as PaymentBookingState,
} as InitialState;
export const paymentBooking = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCarBookedId: (state, action: PayloadAction<Number>) => {
      state.value = { ...state.value, car_booked_id: action.payload };
    },
  },
});

export const { setCarBookedId } = paymentBooking.actions;

export default paymentBooking.reducer;
