// eslint-disable-next-line no-unused-vars
const { testEnviroment } = require('../jest.config')
const listHelper = require('../utils/list_helper')

test ('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})