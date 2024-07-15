import Blog from './Blog'
import NewBlog from './NewBlog'
import Togglable from './Togglable'

const Blogs = ({blogs, user, handleLogout, createBlog, newBlogFormRef}) => {

    return (
        <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel='new blog' ref={newBlogFormRef}>
          <NewBlog createBlog={createBlog}/>
        </Togglable>
        <br/>
        <h3>List of blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default Blogs