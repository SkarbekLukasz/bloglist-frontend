import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const newBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('localUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleUsernameChange = (event) => {
    const changedUsername = event.target.value
    setUsername(changedUsername)
  }

  const handlePasswordChange = (event) => {
    const changedPassword = event.target.value
    setPassword(changedPassword)
  }

  const handleAuthorChange = (event) => {
    const changedAuthor = event.target.value
    setAuthor(changedAuthor)
  }

  const handleTitleChange = (event) => {
    const changedTitle = event.target.value
    setTitle(changedTitle)
  }

  const handleUrlChange = (event) => {
    const changedUrl = event.target.value
    setUrl(changedUrl)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url
      }
      const response = await blogService.saveNewBlog(blog)
      setBlogs(blogs.concat(response))
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage(`Successfully added blog ${response.title} by ${response.author}`)
      newBlogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception.message)
      setMessage('Failed to create blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('localUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('localUser')
    setUser(null)
    setMessage('Logged out')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }
  
  return (
    <div>
      <h1>Blogs list</h1>
      <Notification message={message}/>
      {user === null ?
       <Login handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} handleUsernameChange={handleUsernameChange}/> :
       <Blogs 
        createBlog={createBlog}
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        newBlogFormRef={newBlogFormRef}
        />}
    </div>
  )

}

export default App