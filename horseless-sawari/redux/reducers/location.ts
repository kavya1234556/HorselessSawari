import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: LocationState;
};
type LocationState = {
  pickUpLocation: String;
  dropOffLoction: String;
};

const initialState = {
  value: {
    pickUpLocation: '',
    dropOffLoction: '',
  } as LocationState,
} as InitialState;
export const location = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setpickUpLocation: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, pickUpLocation: action.payload };
    },

    setdropOffLoction: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, dropOffLoction: action.payload };
    },
  },
});

export const { setpickUpLocation, setdropOffLoction } = location.actions;

export default location.reducer;
