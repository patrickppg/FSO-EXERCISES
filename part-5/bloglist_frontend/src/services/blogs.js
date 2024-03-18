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

async function create(newBlog) {
  const res = await axios.post(baseUrl, newBlog, {
    headers: {
      'Authorization': token
    }
  })

  return res.data
}

async function update(blog, update) {
  const res = await axios.put(`${baseUrl}/${blog.id}`, update, {
    headers: {
      'Authorization': token
    }
  })

  return res.data
}

async function remove(blog) {
  const res = await axios.delete(`${baseUrl}/${blog.id}`)
  if (res.status === 204) return true
  else return false
}

export default {
  getAll,
  getUserBlogs,
  setToken,
  create,
  update,
  remove
}