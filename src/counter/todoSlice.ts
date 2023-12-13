import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface CounterState {
  value: string[];
}

const initialState: CounterState = {
  value: [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ],
};

const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => {
        return action.payload != item;
      });
    },
  },
});

//action
export const { addElement, removeElement } = todoSlice.actions;

//selector
export const selectToDoList = (state: RootState) => state.todoList.value;

//thunk action

export default todoSlice.reducer;
