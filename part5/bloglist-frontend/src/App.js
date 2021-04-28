import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const authorHandler = (event) => {
    setAuthor(event.target.value)
  }
  const titleHandler = (event) => {
    setTitle(event.target.value)
  }
  const urlHandler = (event) => {
    setUrl(event.target.value)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({type: 'notification', content: `${user.username} login successfull`})
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    catch(error){
      setMessage({type: 'error', content: 'wrong credentials'})
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.createBlog({title,url,author})
      setBlogs(blogs.concat(blog))
      setTitle('')
      setUrl('')
      setAuthor('')
      setMessage({type: 'notification', content: `a new blog ${blog.title}${blog.author === '' ? '' : ` by ${blog.author}`}`})
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    catch(error){
      setMessage({type: 'error', content: 'Title and Url fields are required'})
      setTimeout(() => {
        setMessage(null)
      },5000)
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInBlogappUser')
    setUser(null)
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }
  
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {user === null ? 
        <LoginForm 
          password={password} 
          username={username} 
          usernameHandler={usernameHandler}
          passwordHandler={passwordHandler}
          handleLogin={handleLogin}
          /> : 
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <BlogForm
           title={title}
           titleHandler={titleHandler}
           url={url}
           urlHandler={urlHandler}
           author={author}
           authorHandler={authorHandler}
           addBlog={addBlog}
          />          
        </div>
      }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App