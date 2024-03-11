import Blog from "./Blog"

function Blogs({ user, blogs, setUser }) {

  function handleLogOut() {
    window.localStorage.removeItem('loggedBloglistAppUser')
    setUser(null)
  }

  return (
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={handleLogOut}>logout</button></p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )
}

export default Blogs