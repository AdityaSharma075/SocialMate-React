import { getAuthToken } from '../helpers/utils';
import {
  FETCH_FRIENDS_SUCCESS,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from './actionTypes';

export function fetchUserFriends() {
  return (dispatch) => {
    const url = '/api/v1/friendship/fetch_user_friends';
    // console.log(url, );
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        dispatch(fetchFriendsSucces(data.data.friends));
      });
  };
}

export function fetchFriendsSucces(friends) {
  //   console.log('here');
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
