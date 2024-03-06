const express = require('express')
const router = express.Router()
const cors = require('cors')
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.use(express.json())
router.use(cors())


router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  res.json(users)
})


router.post('/', async (req, res) => {
  const { name, username, password } = req.body
  const passwordHash = await bcrypt.hash(password, 10)

  const savedUser = await User.create({
    name,
    username,
    passwordHash
  })

  res.status(201).json(savedUser)
})

module.exports = router