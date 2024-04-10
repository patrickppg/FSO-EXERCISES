import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from "@testing-library/react"
import Blog from '../components/Blog'

const newBlog = {
  title: 'test blog',
  author: 'test author',
  url: 'test url'
}

describe('Blog', () => {
  test('renders correctly', () => {

    render(<Blog blog={newBlog} />)
    const BlogOverview = screen.getByTestId('default-view')
    const BlogDetails = screen.getByTestId('details-view')

    expect(BlogOverview).toBeVisible()
    expect(BlogDetails).not.toBeVisible()
  })

  test.only('blog details are shown when view button is clicked', async () => {
    const user = userEvent.setup()
    render(<Blog blog={newBlog} />)
    const viewButton = screen.getByTestId('view-btn')
    const BlogDetails = screen.getByTestId('details-view')

    await user.click(viewButton)
    expect(BlogDetails).toBeVisible()
  })
})