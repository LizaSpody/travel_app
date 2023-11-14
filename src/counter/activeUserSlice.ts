import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface User {
  userName: string;
  password: string;
  fullName: string;
  photo: string;
}

export interface CounterState {
  value: User;
}

const initialState: CounterState = {
  value: {
    userName: '',
    password: '',
    fullName: '',
    photo: '',
  },
};

const userActiveSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    addActiveUser: (state: CounterState, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

//action
export const { addActiveUser } = userActiveSlice.actions;

//selector
export const selectUserActiveList = (state: RootState) =>
  state.userActiveList.value;

//thunk action

export default userActiveSlice.reducer;
