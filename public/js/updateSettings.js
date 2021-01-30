/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
import { logoutAfterPasswordChange } from './login';
// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:8000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:8000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${type[0].toUpperCase() + type.substring(1)} updated successfully!`
      );
      location.reload();
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:8000/api/v1/users/updateMyPassword',
      data: {
        passwordCurrent,
        password,
        passwordConfirm
      }
    });
    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Your password is changed successfully. You will be logged out in 15 sec '
      );
      window.setTimeout(() => {
        logoutAfterPasswordChange();
      }, 15000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
