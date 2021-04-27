const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor





blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  let newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  console.log(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body
  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
  response.json(updatedBlog)
})


module.exports = blogsRouter