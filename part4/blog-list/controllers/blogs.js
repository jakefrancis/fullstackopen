const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  let newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const body = request.body
  const updatedBlog =  await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })
  response.json(updatedBlog)
})


module.exports = blogsRouter