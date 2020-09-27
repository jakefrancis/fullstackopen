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

module.exports = {
  dummy,
  totalLikes
}