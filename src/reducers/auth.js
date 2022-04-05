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
  PASSWORD_NOT_MATCH,
} from '../actions/actionTypes';
const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
  isSignuped: false,
  authenticate: false,
  passwordNotMatch: null,
};
export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case SET_AUTH:
      return {
        ...state,
        authenticate: true,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        inProgress: false,
        error: null,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
        authenticate: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        error: null,
        isSignuped: true,
      };
    case EDIT_USER_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case PASSWORD_NOT_MATCH:
      return {
        ...state,
        passwordNotMatch: true,
      };
    default:
      return state;
  }
}
