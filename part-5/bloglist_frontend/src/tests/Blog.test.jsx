import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import Blog from '../components/Blog'

describe('Blog', () => {
  test('renders correctly', () => {
    const newBlog = {
      title: 'test blog',
      author: 'test author',
      url: 'test url'
    }

    render(<Blog blog={newBlog} />)
    const BlogOverview = screen.getByTestId('default-view')
    const BlogDetails = screen.getByTestId('details-view')

    expect(BlogOverview).toBeVisible()
    expect(BlogDetails).not.toBeVisible()
  })
})