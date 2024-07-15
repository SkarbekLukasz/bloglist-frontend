import React, { useState } from 'react';

const Blog = ({ blog, updateLikes }) => {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  const addLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateLikes(updatedBlog);
  };

  const styles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={styles}>
      <p>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      </p>
      {isVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={addLikes}>like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
