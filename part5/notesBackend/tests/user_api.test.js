const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const { testEnvironment } = require('../jest.config')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for(const user of helper.initialUsers){
      const passwordHash = await bcrypt.hash(user.password, 10)
      const savedUser = new User({
        username: user.username,
        name: user.name,
        passwordHash
      })
      await savedUser.save()
    }
  })

  test('all users returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('return all users in db', async () => { 
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('creation succeeds with new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jfrancis',
      name: 'Jake Franics',
      password: '12345',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)


  })

  test('creation fails with proper status code if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'super user',
      password: 'salami'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'joe',
      name: 'super user',
      password: 'salami'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` (`joe`) is shorter than the minimum allowed length (4)')

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})