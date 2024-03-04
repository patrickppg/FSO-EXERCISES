const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.use(express.json())

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !correctPassword) {
    res.status(401).json({ error: 'invalid username or password' })
    return
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = router