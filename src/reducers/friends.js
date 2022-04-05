import { FETCH_FRIENDS_SUCCESS } from '../actions/actionTypes';

const defaultProfileState = [];

export default function friends(state = [], action) {
  //   console.log('action ', action);
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return {
        friends: action.friends,
      };
    default:
      return state;
  }
}
