const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./testData')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { testEnvironment } = require('../jest.config')
const { deleteOne } = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of helper.blogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

})



test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog contains id property', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog =  {
    title: 'Eloquent Javascript: Chapter 4',
    author: 'Marijn Haverbeke',
    url: 'https://eloquentjavascript.net/04_data.html',
    likes: 10
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)
  const titles = blogsAtEnd.map(res => res.title)
  expect(titles).toContain(
    'Eloquent Javascript: Chapter 4'
  )
})

test('likes default to zero if empty', async () => {
  const newBlog =  {
    title: 'Eloquent Javascript: Chapter 6',
    author: 'Marijn Haverbeke',
    url: 'https://eloquentjavascript.net/06_data.html',
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
  expect(lastBlog.likes).toEqual(0)
})

test('blog without title and url is not added', async () => {
  const newBlog =  {
    author: 'Marijn Haverbeke',
    likes: 10
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})

test('blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const  blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1)
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('blog likes can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToUpdate = { ...blogsAtStart[0] }
  blogToUpdate.likes += 1
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).not.toEqual(blogsAtStart[0].likes)
})


afterAll(() => {
  mongoose.connection.close()
})