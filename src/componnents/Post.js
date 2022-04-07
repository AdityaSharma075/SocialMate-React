import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment } from './';
import { images } from '../helpers';

import { addLike, createComment } from '../actions/posts';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      isPostLikedByUser: false,
    };
  }
  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;

    if (e.key === 'Enter') {
      // console.log('dispacthed');
      this.props.dispatch(createComment(comment, post._id));

      // clear comment
      this.setState({
        comment: '',
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, 'Post', user._id));
    // this.forceUpdate();
  };

  render() {
    const { post, user } = this.props;
    const { comment } = this.state;
    let isPostLikedByUser = false;

    // console.log('acasfcef', post.updatedAt);
    var current = new Date();
    const time = new Date(post.createdAt);

    let min = Math.floor((current - time) / (1000 * 60));

    let flag = false;
    if (min > 60) {
      flag = true;
      min = time.toLocaleDateString();
    }

    post.likes.map((like) => {
      if (like.user._id === user._id) {
        isPostLikedByUser = true;
      }
      return like;
    });
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            {post.user._id === user._id ? (
              <Link to={`/setting`}>
                <img src={images.user} alt="user-pic" />
              </Link>
            ) : (
              <Link to={`/user/${post.user._id}`}>
                <img src={images.user} alt="user-pic" />
              </Link>
            )}
            <div>
              <span className="post-author">{post.user.name}</span>
              {flag ? (
                <span className="post-comment-time"> {min} </span>
              ) : (
                <span className="post-comment-time"> {min} minutes ago</span>
              )}
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img src={images.heart_active} alt="like post" />
              ) : (
                <img src={images.heart} alt="likes-icon" />
              )}
              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon">
              <img src={images.comment} alt="comments-icon" />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {}
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Post);
