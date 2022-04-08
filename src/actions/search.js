import {
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_START,
  CLEAR_SEARCH_STATE,
} from './actionTypes';
import { getAuthToken } from '../helpers/utils';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = `/api/v1/search?text=${searchText}`;
    dispatch(searchResultsStart());
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((repsonse) => repsonse.json())
      .then((data) => {
        // console.log('SEARCH data', data);
        if (data.success) {
          dispatch(searchResultsSuccess(data.data.users));
        } else {
          dispatch(searchResultsSuccess([]));
        }
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
export function searchResultsStart() {
  return {
    type: FETCH_SEARCH_RESULTS_START,
  };
}

export function clearSearchState() {
  return {
    type: CLEAR_SEARCH_STATE,
  };
}
