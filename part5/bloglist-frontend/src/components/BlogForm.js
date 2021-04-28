import React from 'react'


const BlogForm = ({author,authorHandler,title,titleHandler,url,urlHandler,addBlog}) => {
  

  
  return (
  
      <form onSubmit={addBlog}>
        <h2>Create New</h2>
        <div>
         Title:
        <input
          type='text'
          name='Title'
          value={title}
          onChange={titleHandler}
        />
        </div>
        <div>
          Author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={authorHandler}
        />
        </div>
        <div>
          Url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={urlHandler}
        />        
        </div>   
        <button type="submit">save</button>
      </form>  
    
  )
}

export default BlogForm