import { UPDATE_POST } from './actionTypes';
export function fetchPosts() {
  return (dispatch) => {
    const url = 'api/v1/posts/?page=1&limit=5';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updatePost(data.posts));
      });
  };
}

export function updatePost(posts) {
  return {
    type: UPDATE_POST,
    posts,
  };
}
