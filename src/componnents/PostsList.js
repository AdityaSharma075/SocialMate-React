import React, { Component } from 'react';
import PropTypes from 'prop-types';
class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1637320475~hmac=445a41a0f8c9566cc7b6e9898d5abeef"
                  alt="user-pic"
                />
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago...</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>
              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/2589/premium/2589175.png?token=exp=1637320536~hmac=3f4ac8d7c25cc04dfba4520d0b0d3ee4"
                    alt="like icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/3114/premium/3114810.png?token=exp=1637320568~hmac=f0f2bf4680b9b4177824df0921dc265e"
                    alt="comments-icon"
                  />
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
