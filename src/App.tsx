import React from 'react';
import './App.css';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import Info from './pages/Info';
import User from './pages/User/User';
import Tours from './pages/Tours/Tours';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import Tour from './pages/Tour';
import AddTour from './pages/AddTour/AddTour';
import Registration from './pages/Registration/Registration';

//ant-design
//ant-design-chart
//husky
//lint-stage
//prettier
//es-lint
//react-testing-library
//jest
//type Script
//redux
//react-redux
//redux-toolkit

const router = createBrowserRouter([
  {
    path: '/',
    element: <Info />,
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => localStorage.getItem("userActive") ? redirect('/user') : null
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/tours',
    element: <Tours />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/tour/:tourId',
    element: <Tour />,
  },
  {
    path: '/add',
    element: <AddTour />,
  },
  {
    path: '/registration',
    element: <Registration />,
    loader: () => localStorage.getItem("userActive") ? redirect('/user') : null
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
