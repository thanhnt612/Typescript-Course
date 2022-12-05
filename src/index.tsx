import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
//Cấu hình redux
import { Provider } from 'react-redux';
import { store } from "./redux/configStore"
import UserTemplate from './templates/UserTemplate';
import ResponsiveItem from './component/ResponsiveItem';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='*' element={<Navigate to="" />}></Route>
        </Route>
        <Route path='user' element={<UserTemplate />}>
          <Route index element={<ResponsiveItem component={<Login />}
            mobileComponent={<div>Login</div>} />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Login />}></Route>
          <Route path='*' element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

);

