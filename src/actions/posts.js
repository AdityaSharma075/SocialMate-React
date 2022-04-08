import {
  UPDATE_POST,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POST_UNLIKE,
} from './actionTypes';
import { getAuthToken, getFormBody } from '../helpers/utils';
export function fetchPosts() {
  return (dispatch) => {
    const url = 'api/v1/posts/?page=1&limit=5';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
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
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = '/api/v1/posts/create';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('dATA', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}
export function createComment(content, postId) {
  return (dispatch) => {
    const url = '/api/v1/comments';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('this is data', data);
        if (data.success) {
          // console.log('this is data', data);
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = `/api/v1/likes/toggle?likeable_id=${id}&likeable_type=${likeType}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('LIKE DATA', data);

        if (data.success) {
          if (likeType === 'Post') {
            if (data.data.deleted) {
              // dispatch(addUnLikeToStore(id, userId));
              // console.log('i am in deleted');
              dispatch(addUnLikeToStore(id, userId, data.data.like));
            } else {
              // console.log('i am not');

              dispatch(addLikeToStore(id, userId, data.data.like));
            }
          }
        }
      });
  };
}

export function addLikeToStore(postId, userId, like) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
    like,
  };
}
export function addUnLikeToStore(postId, userId, like) {
  return {
    type: UPDATE_POST_UNLIKE,
    postId,
    userId,
    like,
  };
}
// export function addLikeToStoreComment(commentId, userId, like) {
//   return {
//     type: UPDATE_COMMENT_LIKE,
//     commentId,
//     userId,
//     like,
//   };
// }
// export function addUnLikeToStoreComment(commentId, userId, like) {
//   return {
//     type: UPDATE_COMMENT_UNLIKE,
//     commentId,
//     userId,
//     like,
//   };
// }
