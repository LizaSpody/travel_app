import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface User {
  userName: string;
  password: string;
  fullName: string;
  photo: string;
}

export interface CounterState {
  value: User[];
}

const initialState: CounterState = {
  value: [
    {
      userName: 'user1',
      password: 'user1',
      fullName: 'User1',
      photo:
        'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    },
    {
      userName: 'user2',
      password: 'user2',
      fullName: 'User2',
      photo:
        'https://cdn.imgbin.com/10/20/11/imgbin-avatar-user-profile-icon-women-wear-frock-GNLBV4N6qanFpjEYMEqxEgcCd.jpg',
    },
    {
      userName: 'user3',
      password: 'user3',
      fullName: 'User3',
      photo: '',
    },
  ],
};

const userSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      console.log('j');
    },
    removeElement: (state, action: PayloadAction<string>) => {},
  },
});

//action
export const { addElement, removeElement } = userSlice.actions;

//selector
export const selectUserList = (state: RootState) => state.userList.value;
export const selectorUserName = (state: RootState) =>
  state.userList.value.map((item) => item.userName);

//thunk action

export default userSlice.reducer;
