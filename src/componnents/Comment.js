import React from 'react';

function Comment({ comment }) {
  var current = new Date();
  const time = new Date(comment.updatedAt);

  let min = Math.floor((current - time) / (1000 * 60));
  // hour = hour + 1;
  let flag = false;
  if (min > 12) {
    flag = true;
    min = time.toLocaleDateString();
  }
  // minutes = Math.floor(minutes / (3600 * 24));
  // console.log('afccxssssssssss', minutes);
  // console.log('tine us ', time);

  return (
    <div className="post-comment-item">
      <div className="post-comment-header">
        <span className="post-comment-author">{comment.user.name}</span>
        {flag ? (
          <span className="post-comment-time"> {min} </span>
        ) : (
          <span className="post-comment-time"> {min} minutes ago</span>
        )}

        {/* <span className="post-comment-likes">{comment.likes.length} likes</span> */}
      </div>

      <div className="post-comment-content">{comment.content}</div>
    </div>
  );
}

export default Comment;
