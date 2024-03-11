import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blogs from './components/blogs'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
}, [])

  useEffect(() => {
    if (user) {
      blogService.getUserBlogs(user)
        .then(blogs => setBlogs(blogs))
    }
  }, [user])

  async function handleLogin(e) {
    e.preventDefault()

    const user = await loginService.login({ username, password })
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
    blogService.getUserBlogs(user)
      .then(userBlogs => setBlogs(userBlogs))

    setUser(user)
    
    setUsername('')
    setPassword('')
  }

  return (
    user === null
      ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      : <Blogs
          user={user}
          blogs={blogs}
          setUser={setUser}
        />
  )
  
}

export default App




