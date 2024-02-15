'use strict'

const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())


app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

app.post('/api/blogs', (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then(createdBlog => {
      res.status(201).json(createdBlog)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})