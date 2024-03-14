import Blog from "./Blog"
import NewBlogForm from "./newBlogForm"
import Togglable from "./Togglable"

function Blogs({ user, blogs, setUser, setBlogs, notification, setNotification }) {

  function handleLogOut() {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  return (
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
    <NewBlogForm user={user} setBlogs={setBlogs} notification={notification} setNotification={setNotification} />
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )
}

export default Blogs