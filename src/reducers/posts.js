import {
  UPDATE_POST,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_POST_UNLIKE,
} from '../actions/actionTypes';
export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POST:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      console.log('state in reduser', state);
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.like],
          };
        }

        return post;
      });
      return updatedPosts;
    case UPDATE_POST_UNLIKE:
      const upPosts = state.map((post) => {
        if (post._id === action.postId) {
          let newLikes = post.likes.filter((like) => {
            if (like._id !== action.like._id) {
              return like;
            }
          });
          return {
            ...post,
            likes: newLikes,
          };
        }

        return post;
      });
      return upPosts;
    default:
      return state;
  }
}
