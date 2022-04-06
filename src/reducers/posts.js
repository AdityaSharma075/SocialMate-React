import { UPDATE_POST, ADD_POST, ADD_COMMENT } from '../actions/actionTypes';
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
    default:
      return state;
  }
}
