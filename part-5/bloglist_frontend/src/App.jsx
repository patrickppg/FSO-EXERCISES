import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  async function handleLogin(e) {
    e.preventDefault()

    const user = await blogService.login({ username, password })
    const blogs = await blogService.getUser(user)
    setBlogs(blogs)
    setUser(user)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username: 
          <input
            type="text"
            name='Username'
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password: 
          <input
            type="password"
            name='Password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button>login</button>
      </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App