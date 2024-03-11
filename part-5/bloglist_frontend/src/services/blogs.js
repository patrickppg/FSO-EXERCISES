import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

function getAll() {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

function getUserBlogs(user) {
  const res = axios.get(`${baseUrl}/${user.username}`, {
    headers: {
      'Authorization': token
    }
  })
  return res.then(res => res.data.blogs)
}

export default { getAll, getUserBlogs, setToken }