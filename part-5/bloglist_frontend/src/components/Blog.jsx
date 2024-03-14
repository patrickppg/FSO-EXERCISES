import { useState } from "react"
import blogService from '../services/blogs'

function Blog({ blog }) {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = {display: visible ? "" : "none"}
  const blogStyles = {
    margin: "5px 0",
    border: "solid 1px",
    padding: "5px"
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

  return (
    <div style={blogStyles}>
      <div>
        <span>{blog.title}</span>
        <button type="button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{likes} <button type="button" onClick={handleLikeClick}>like</button></div>
        <div>{blog.author}</div>
        {/* there is no problem here - step 9 */}
      </div>
    </div>  
  )
}

export default Blog