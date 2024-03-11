import Blog from "./Blog"
import NewBlogForm from "./newBlogForm"

function Blogs({ user, blogs, setUser, setBlogs }) {

  function handleLogOut() {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  return (
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
    <NewBlogForm user={user} setBlogs={setBlogs} />
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )
}

export default Blogs