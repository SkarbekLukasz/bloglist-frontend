import Blog from './Blog'
import NewBlog from './NewBlog'

const Blogs = ({blogs, user, handleLogout, handleAuthorChange, handleTitleChange, handleUrlChange, createBlog}) => {
    return (
        <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <NewBlog handleAuthorChange={handleAuthorChange} handleTitleChange={handleTitleChange} handleUrlChange={handleUrlChange} createBlog={createBlog}/>
        <br/>
        <h3>List of blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default Blogs