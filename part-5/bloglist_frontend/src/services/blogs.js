import axios from 'axios'
const baseUrl = '/api/blogs'

function getAll() {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

async function getUser(user) {
  const res = await axios.get(`${baseUrl}/${user.username}`, {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
  return res.data.blogs
}


async function login(credentials) {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export default { getAll, login, getUser }