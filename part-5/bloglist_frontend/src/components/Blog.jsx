import { useState } from "react"

function Blog({ blog }) {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = {display: visible ? "" : "none"}
  const blogStyles = {
    margin: "5px 0",
    border: "solid 1px",
    padding: "5px"
  }

  function toggleVisibility() {
    setVisible(!visible)
  }

  return (
    <div style={blogStyles}>
      <div>
        <span>{blog.title}</span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button type="button">like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>  
  )
}

export default Blog