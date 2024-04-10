import { useState } from 'react'
import blogService from '../services/blogs'

function Blog({ blog }) {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [removed, setRemoved] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const blogStyles = {
    margin: '5px 0',
    border: 'solid 1px',
    padding: '5px'
  }

  function toggleVisibility() {
    setVisible(!visible)
  }

  async function handleLikeClick() {
    const update = {
      ...blog,
      likes: likes + 1
    }

    const updatedBlog = await blogService.update(blog, update)
    setLikes(updatedBlog.likes)
  }

  async function handleRemoveClick() {
    const confirmation = window.confirm('This blog will be removed')
    if (!confirmation) return
    const removed = await blogService.remove(blog)
    if (removed) setRemoved(true)
  }

  return (
    removed
      ? null
      : <div style={blogStyles}>
        <div data-testid='default-view'>
          <span>{blog.title}</span>
          <button type="button" onClick={toggleVisibility}>view</button>
        </div>
        <div data-testid='details-view' style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>{likes} <button type="button" onClick={handleLikeClick}>like</button></div>
          <div>{blog.author}</div>
          <button type="button" onClick={handleRemoveClick}>remove</button>
          {/* there is no problem here - step 9 */}
        </div>
      </div>
  )
}

export default Blog