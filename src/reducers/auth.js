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
} from '../actions/actionTypes';
const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
  isSignuped: false,
  authenticate: false,
};
export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
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

    default:
      return state;
  }
}
