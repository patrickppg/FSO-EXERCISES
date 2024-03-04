const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.use(express.json())

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  const body = req.body
  const user = await User.findOne({})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user.id
  })

  try {
    const createdBlog = await blog.save()
    user.blogs.push(createdBlog._id)
    await user.save()
    res.status(201).json(createdBlog)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const body = req.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ?? 0
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
      runValidators: true,
      context: 'query'
    })
    
    res.status(200).json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = router