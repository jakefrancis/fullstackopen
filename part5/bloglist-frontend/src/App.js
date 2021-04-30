import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const getAllBlogs = async () => {
    const reqBlogs = await blogService.getAll()
    setBlogs(reqBlogs.sort((a,b) => b.likes - a.likes))
  }


  useEffect(getAllBlogs, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (credentials) => {
    try{
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage({ type: 'notification', content: `${user.username} login successfull` })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    catch(error){
      setMessage({ type: 'error', content: 'wrong credentials' })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  const addBlog = async (blogObject) => {
    try{
      const blog = await blogService.createBlog(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(blog))
      setMessage({ type: 'notification', content: `a new blog ${blog.title}${blog.author === '' ? '' : ` by ${blog.author}`}` })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    catch(error){
      setMessage({ type: 'error', content: 'Title and Url fields are required' })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }

  }

  const likeBlog = async (blogObject) => {
    try{
      const blog = await blogService.likeBlog(blogObject)
      let copy = [...blogs]
      let updateIndex = copy.findIndex(blogToUpdate => blogToUpdate.id === blog.id)
      copy[updateIndex] = blog
      setBlogs(copy.sort((a,b) => b.likes - a.likes))
    }
    catch(error){
      setMessage({ type: 'error', content: 'like error' })
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    try{
      await blogService.deleteBlog(blogObject)
      let copy = [...blogs]
      copy = copy.filter(blog => blog.id !== blogObject.id)
      setBlogs(copy)
    }
    catch(error){
      setMessage({ type: 'error', content: 'unauthorized' })
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


  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {user === null ?
        <LoginForm
          login={handleLogin}
        /> :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {blogForm()}
        </div>
      }
      {user !== null ?blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          updateLike={likeBlog}
          user={user.username}
          deleteBlog={deleteBlog}/>
      ) : null
      }
    </div>
  )
}

export default App