import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: BookingState;
};
type BookingState = {
  location_id: Number;
  pickUpDate: Date;
  pickUpTime: String;
  dropOffDate: Date;
  dropOffTime: String;
};
const initialPickUpDate = new Date();
const initialDropOffDate = new Date();
initialDropOffDate.setDate(initialDropOffDate.getDate() + 1);
const initialState = {
  value: {
    location_id: 0,
    pickUpDate: initialPickUpDate,
    pickUpTime: '',
    dropOffDate: initialDropOffDate,
    dropOffTime: '',
  } as BookingState,
} as InitialState;
export const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setLocationID: (state, action: PayloadAction<Number>) => {
      state.value = { ...state.value, location_id: action.payload };
    },
    setPickUpDate: (state, action: PayloadAction<Date>) => {
      state.value = { ...state.value, pickUpDate: action.payload };
    },
    setPickUpTime: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, pickUpTime: action.payload };
    },
    setDropOffDate: (state, action: PayloadAction<Date>) => {
      state.value = { ...state.value, dropOffDate: action.payload };
    },
    setDropOffTime: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, dropOffTime: action.payload };
    },
  },
});

export const {
  setLocationID,
  setPickUpDate,
  setPickUpTime,
  setDropOffDate,
  setDropOffTime,
} = booking.actions;

export default booking.reducer;
