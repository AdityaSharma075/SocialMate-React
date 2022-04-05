import { getAuthToken } from '../helpers/utils';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILURE,
  USER_PROFILE_SUCCESSFUL,
} from './actionTypes';

export function startUserProfileFetch() {
  return {
    type: FETCH_USER_PROFILE,
  };
}
export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESSFUL,
    user,
  };
}

export function userProfileFailes(error) {
  return {
    type: USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startUserProfileFetch());

    const url = `/api/v1/users/${userId}`;
    // console.log(' url', url);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('this is data', data);
        dispatch(userProfileSuccess(data.data.user));
      });
  };
}
