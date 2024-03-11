import axios from "axios"

async function login(credentials) {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export default {login}