import {
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_START,
  CLEAR_SEARCH_STATE,
} from '../actions/actionTypes';

const initialSearchState = {
  results: [],
  isSearching: null,
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_START:
      return {
        ...state,
        isSearching: true,
      };
    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        results: [],
        isSearching: null,
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
        isSearching: false,
      };
    default:
      return state;
  }
}
