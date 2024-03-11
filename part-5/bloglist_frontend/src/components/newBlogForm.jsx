import { useState } from "react"
import blogService from "../services/blogs"
import Notification from "./Notification"

function NewBlogForm({ user, setBlogs, notification, setNotification }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  async function handleBlogCreation(e) {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    await blogService.create(newBlog)
    const userBlogs = await blogService.getUserBlogs(user)
    setBlogs(userBlogs)
    setAuthor('')
    setTitle('')
    setUrl('')
    setNotification({
      message: 'new blog added',
      status: 'success'
    })
    setTimeout(() => {
      setNotification({})
    }, 4000);
  }

  return (
    <div>
      <h2>create new</h2>
      <Notification notification={notification} />
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
            name="Title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            name="Author"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            name="Url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default NewBlogForm