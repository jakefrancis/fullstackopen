import React, { useState } from 'react'


const BlogForm = ({
  createBlog
}) => {

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

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ author,title,url })
    setTitle('')
    setUrl('')
    setAuthor('')
  }


  return (

    <form className='blog-form' onSubmit={addBlog}>
      <h2>Create New</h2>
      <div className='blog-form__input'>
        <label>Title</label>
        <input
          id='title'
          type='text'
          name='Title'
          value={title}
          onChange={titleHandler}
        />
      </div>
      <div className='blog-form__input'>
        <label>Author</label>
        <input
          id='author'
          type='text'
          value={author}
          name='Author'
          onChange={authorHandler}
        />
      </div>
      <div className='blog-form__input'>
        <label>Url</label>
        <input
          id='url'
          type='text'
          value={url}
          name='Url'
          onChange={urlHandler}
        />
      </div>
      <button className='btn-inline blog-form__button'type="submit">save</button>
    </form>

  )
}

export default BlogForm