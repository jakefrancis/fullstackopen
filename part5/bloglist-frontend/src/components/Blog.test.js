import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />' , () => {

  const mockHandler = jest.fn()

  let component

  const blog =
  {
    author: 'Jake Francis',
    title: 'Jake loves Leigh',
    likes: '1',
    url: 'www.jakelovesleigh.com',
    user: 'Donnie Francis',
    likedBy : [{ username: 'fakename' }]
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateLike={mockHandler} />
    )
  })

  test('renders content', () => {


    const titleAndAuthor = component.getByText(
      'Jake loves Leigh - Jake Francis'
    )
    expect(titleAndAuthor).toBeDefined()

    const viewButton = component.getByText('view')

    expect(viewButton).toBeDefined()

    expect(component.container).not.toHaveTextContent(
      'www.jakelovesleigh.com'
    )
    expect(component.container).not.toHaveTextContent(
      '1'
    )

  })

  test('shows likes and url when view button clicked', () => {


    const titleAndAuthor = component.getByText(
      'Jake loves Leigh - Jake Francis'
    )
    expect(titleAndAuthor).toBeDefined()

    const viewButton = component.getByText('view')

    expect(viewButton).toBeDefined()

    fireEvent.click(viewButton)

    const hideButton = component.getByText('hide')

    expect(hideButton).toBeDefined()

    const url = component.getByText('www.jakelovesleigh.com')

    expect(url).toBeDefined()

    const likes = component.getByText('likes:1')
    expect(likes).toBeDefined()

  })

  test('shows likes and url when view button clicked', () => {


    const viewButton = component.getByText('view')
    expect(viewButton).toBeDefined()
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector('.likeButton')
    expect(likeButton).toBeDefined()

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })



})





