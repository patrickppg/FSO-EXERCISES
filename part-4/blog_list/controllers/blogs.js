const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.use(express.json())

router.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => res.json(blogs))
})

router.post('/', (req, res) => {
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

module.exports = router