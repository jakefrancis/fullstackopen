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
  let mostLikes = {};
  let greatest = 0;
  blogs.forEach(({...blog}) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}