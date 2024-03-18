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
  const [notification, setNotification] = useState({})

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
  })

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.getUserBlogs(user)
        .then(userBlogs => setBlogs(userBlogs))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setNotification({
        message: 'invalid username or password',
        status: 'fail'
      })

      setTimeout(() => {
        setNotification({})
      }, 4000)
    }
  }

  return (
    user === null
      ? <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        notification={notification}
      />
      : <Blogs
        user={user}
        blogs={blogs}
        setUser={setUser}
        setBlogs={setBlogs}
        notification={notification}
        setNotification={setNotification}
      />
  )
}

export default App




