import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('<Blog />' , () => {

  const createBlog = jest.fn()

  let component

  const blog =
  {
    author: 'Jake Francis',
    title: 'Jake loves Leigh',
    url: 'www.jakelovesleigh.com',
  }

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog} />
    )
  })

  test('can input into form', () => {

    const form = component.container.querySelector('form')

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.change(url, { target: { value: blog.url } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual(blog)

  })



})





