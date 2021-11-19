import { UPDATE_POST } from '../actions/actionTypes';
export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POST:
      return action.posts;
    default:
      return state;
  }
}
