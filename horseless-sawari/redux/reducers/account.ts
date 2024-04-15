import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  value: AccountState;
};
type AccountState = {
  acc_id: Number;
  first_name: String;
  phone_number: String;
};

const initialState = {
  value: {
    acc_id: 0,
    first_name: '',
    phone_number: '',
  } as AccountState,
} as InitialState;
export const account = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAcountID: (state, action: PayloadAction<Number>) => {
      state.value = { ...state.value, acc_id: action.payload };
    },
    setFirstName: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, first_name: action.payload };
    },
    setPhoneNumber: (state, action: PayloadAction<String>) => {
      state.value = { ...state.value, phone_number: action.payload };
    },
  },
});

export const { setAcountID, setPhoneNumber, setFirstName } = account.actions;

export default account.reducer;
