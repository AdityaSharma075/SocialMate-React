import React from 'react';

function Comment({ comment }) {
  var current = new Date();
  const time = new Date(comment.createdAt);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const t = new Intl.DateTimeFormat('en-US', options).format(time);

  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>

        <span className="post-comment-time">{t}</span>

        {/* <span className="post-comment-likes">{comment.likes.length} likes</span> */}
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
