import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from './actionTypes';
import { getFormBody } from '../helpers/utils';
export function startLogin() {
  return {
    type: LOGIN_START,
  };
}
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = '/api/v1/users/create-session';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
