const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  let likes = blogs.map(blog => blog.likes)

  const reducer = (sum , likes) => {
    return sum + likes
  }
  return blogs === 0
    ? 0
    : (likes.reduce(reducer, 0))
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return
  }
  let mostLikes = {}
  let greatest = 0
  blogs.forEach(({ ...blog }) => {
    if (blog.likes > greatest){
      greatest = blog.likes
      mostLikes = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  }
  )

  return mostLikes

}

/*const mostBlogs = (blogs) => {
  let authors = {}
  let mostBlogs = {}

  blogs.forEach( blog => {
    if(authors[blog.author]){
        authors[blog.author].blogs++
    }
    else{
      authors[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    }
  })

    let greatest = 0
    for (author in authors)
    {
        if(authors[author].blogs > greatest){
          greatest = authors[author].blogs
          mostBlogs = {
            author : authors[author].author,
            blogs : authors[author].blogs
          }
        }
    }

  return mostBlogs


}

*/

const mostBlogs = (blogs) => {

  let authors =  _.countBy(blogs, (blog) => blog.author)

  authors = _.transform(authors, (result, value, key) => {
    result.push({
      author: key,
      blogs : value
    })
  }, [])

  return _.maxBy(authors, (author) => author.blogs )

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}