function LoginForm({ handleLogin, username, password, setUsername, setPassword }) {
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
}

export default LoginForm