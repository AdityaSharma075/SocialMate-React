import {
  FETCH_USER_PROFILE,
  UPDATE_POST,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESSFUL,
} from '../actions/actionTypes';
const initialProfileState = {
  user: {},
  error: null,
  success: null,
  inProgress: false,
};
export default function profile(state = initialProfileState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESSFUL:
      return {
        ...state,
        success: true,
        user: action.user,
        inProgress: false,
      };
    case USER_PROFILE_FAILURE:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };
    default:
      return state;
  }
}
