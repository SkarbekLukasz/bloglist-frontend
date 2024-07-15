import { useState } from 'react' 

const Blog = ({ blog }) => {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = (event) => {
    setVisible(!isVisible)
  }

  const styles = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!isVisible) {
    return(
      <div style={styles}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>  
    )
  } else if(isVisible) {
    return(
      <div style={styles}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>  
    )
  }

}

export default Blog