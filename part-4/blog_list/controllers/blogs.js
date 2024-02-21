const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.use(express.json())

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})

module.exports = router