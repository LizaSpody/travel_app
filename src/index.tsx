import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import todoList from './counter/todoSlice';
import planList from './counter/planSlice';
import userList from './counter/usersSlice';
import userActiveList from './counter/activeUserSlice';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const store = configureStore({
  reducer: {
    todoList,
    userList,
    userActiveList,
    planList,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
