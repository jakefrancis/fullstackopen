import React, { useEffect, useState } from 'react'
const Blog = ({ blog, updateLike,user, deleteBlog }) => {
  const [detailedView, setDetailedView] = useState(true)
  const [liked, setLiked] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailHandler = () => {
    setDetailedView(!detailedView)
    if(detailedView) determineLiked()
  }

  const likeHandler = (event) => {
    event.preventDefault()
    updateLike(blog)
    setLiked(!liked)
  }

  const deleteHandler = (event) => {
    event.preventDefault()
    const message = `Are you sure you want to remove ${blog.title} by ${blog.author}?`
    if(window.confirm(message)) deleteBlog(blog)

  }

  const determineLiked = () => {
    const usernames = blog.likedBy.map(like => like.username)
    setLiked(usernames.includes(user))
  }

  useEffect(() => {
    setDetailedView(true)
  },[])

  return (
    <div style={blogStyle} className='blog'>
      <p className='description'>{blog.title} - {blog.author}</p>
      {detailedView ?
        <div className='briefView'>
          <button onClick={detailHandler}>view</button>
        </div>
        : <div className='detailedView'>
          <button onClick={detailHandler}>hide</button>
          <br></br>
          <a href={blog.url.slice(0,4) !== 'http' ? '//'+blog.url : blog.url}>{blog.url}</a>
          <p className='likes'>likes:{blog.likes}</p>
          <button className ='likeButton' onClick={likeHandler}>{ liked ? 'unlike' : 'like'}</button>
          <h3>{blog.user.name}</h3>
          {user === blog.user.username ? <button onClick={deleteHandler}>remove</button> : null}
        </div>
      }
    </div>
  )
}

export default Blog