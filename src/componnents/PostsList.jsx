import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { images } from '../helpers';
import { CreatePost, Post } from './';

class PostsList extends Component {
  render() {
    const { posts, user } = this.props;
    return (
      <div className="posts-list">
        <CreatePost user={user} />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}
PostsList.protoTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
