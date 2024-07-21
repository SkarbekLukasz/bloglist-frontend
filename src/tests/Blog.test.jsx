import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect } from 'vitest'

test('renders content', () => {
    const blog = {
        title: 'Some title',
        author: 'Some author',
        likes: 1
    }

    const { container } = render(<Blog blog={blog} />)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Some title Some author')

    const details = container.querySelector('.blogDetails')
    expect(details).toBeNull
})