/* eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    if (document.title === 'Natours | Log into your account')
      showAlert('error', err.response.data.message);
  }
};

//window.location.href === 'http://127.0.0.1:8000/login'

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
        //
      }, 0);

      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Eroor logging out! try Again');
  }
};

export const logoutAfterPasswordChange = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/v1/users/logout'
    });
    if (res.data.status === 'success') {
      location.reload(true);
      window.setTimeout(() => {
        location.assign('/login');
      }, 0);
    }
  } catch (err) {
    showAlert('error', 'Eroor logging out! try Again');
  }
};
