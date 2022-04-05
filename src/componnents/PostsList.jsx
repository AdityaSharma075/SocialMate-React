import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { images } from '../helpers';

import { Link } from 'react-router-dom';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                  <img src={images.man} alt="user-pic" />
                </Link>
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago...</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img src={images.heart_active} alt="like icon" />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img src={images.comment} alt="comments-icon" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Enter comment here..." />
              </div>
              <div className="post-comments-list">
                <div className="post-comments-items">
                  <div className="post-comment-header">
                    <span className="post-comment-author"> bill</span>
                    <span className="post-comment-time"> a minute ago..</span>
                    <span className="post-comment-likes"> 5</span>
                  </div>
                  <div className="post-comment-content">Random comment</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
PostsList.protoTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
