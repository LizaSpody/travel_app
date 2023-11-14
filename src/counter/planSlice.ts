import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface DateTour {
  start: Date;
  finish: Date;
}

interface ToursPlan {
  city: string;
  desc: string;
  ticket: [];
  hotel: [];
  dates: DateTour;
}

interface Plan {
  id: number;
  name: string;
  tags: string[];
  userCreator: string;
  photos: string[];
  dates: DateTour;
  plan: ToursPlan[];
}

export interface CounterState {
  value: Plan[];
}

const initialState: CounterState = {
  value: [
    {
      id: 0,
      name: 'Tour 1',
      tags: ['hotel', 'Amsterdam', 'trip'],
      userCreator: 'user1',
      photos: [
        'https://assets.gq.ru/photos/5d9f4f2d4c4d5f0009b28267/16:9/w_2560%2Cc_limit/16.jpg',
        'https://img.championat.com/s/735x490/news/big/v/r/na-kraju-zemli-10-neobychnyh-idej-dlja-puteshestvija_1517331980822771222.jpg',
        'https://www.onetwotrip.com/ru/blog/static/images/travel-good-for-your-health/girl-mountain.jpg',
      ],
      dates: {
        start: new Date(2023, 9, 29, 12, 0, 0),
        finish: new Date(2023, 10, 7, 12, 0, 0),
      },
      plan: [
        {
          city: 'Milano',
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          ticket: [],
          hotel: [],
          dates: {
            start: new Date(2023, 9, 29, 12, 0, 0),
            finish: new Date(2023, 10, 3, 12, 0, 0),
          },
        },
        {
          city: 'Berlin',
          desc: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          ticket: [],
          hotel: [],
          dates: {
            start: new Date(2023, 10, 3, 12, 0, 0),
            finish: new Date(2023, 10, 5, 12, 0, 0),
          },
        },
        {
          city: 'Amsterdam',
          desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          ticket: [],
          hotel: [],
          dates: {
            start: new Date(2023, 10, 5, 12, 0, 0),
            finish: new Date(2023, 10, 7, 12, 0, 0),
          },
        },
      ],
    },
  ],
};

const planSlice = createSlice({
  name: 'planList',
  initialState,
  reducers: {
    addElement: (state, action: PayloadAction<string>) => {
      console.log('add');
    },
    removeElement: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => {
        return console.log('remove');
      });
    },
  },
});

//action
export const { addElement, removeElement } = planSlice.actions;

//selector
export const selectPlanList = (state: RootState) => state.planList.value;
export const selectorPlanFilter = (state: RootState, user: string) =>
  state.planList.value.filter((item) => item.userCreator === user);
export const selectorPlanId = (state: RootState, id: number) =>
  state.planList.value.filter((item) => item.id === id);

//thunk action

export default planSlice.reducer;
