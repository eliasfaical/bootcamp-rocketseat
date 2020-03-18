import React from 'react';

function PostItem({ content }) {
  return (
    <article className="post">
      <p className="post-content">{content}</p>
    </article>
  )
}

export default PostItem;