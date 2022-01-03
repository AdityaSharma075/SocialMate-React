import {
  AUTHENTICATE_USER,
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  SIGNUP_FAILED,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SET_AUTH,
  EDIT_USER_SUCCESSFUL,
  EDIT_USER_FAILED,
} from './actionTypes';
import { getAuthToken, getFormBody } from '../helpers/utils';

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

export function signin(email, password, confirm_password, name) {
  return (dispatch) => {
    dispatch(startSignup());
    const url = '/api/v1/users/sign-up';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password, confirm_password, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(signupSuccess());

          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}
export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}
export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}
export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
export function notAuthenticate() {
  return {
    type: SET_AUTH,
  };
}

export function editUserSuccesful(user) {
  return {
    type: EDIT_USER_SUCCESSFUL,
    user,
  };
}
export function editUserFailed(error) {
  return {
    type: EDIT_USER_FAILED,
    error,
  };
}
export function editUser(name, password, confirm_password, userId) {
  return (dispatch) => {
    const url = '/api/v1/users/edit';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ name, password, confirm_password, _id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(editUserSuccesful(data.data.user));

          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }
        dispatch(editUserFailed(data.message));
      });
  };
}
