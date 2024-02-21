const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const { beforeEach, test, after } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const newBlogs = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = newBlogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs')
  assert.strictEqual(res.body.length, initialBlogs.length)
})

test('a blog can be added to the db', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  assert.strictEqual(res.body.length, initialBlogs.length + 1)
})

test('returned saved blog has an id property', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert(res.body.id)
})

test('if the likes property is missing from the request, it defaults to 0', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  }

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.likes, 0)
})

test('if the properties title or url are missing from the request, the response is a 400 error', async () => {
  const newBlog = {
    author: "Edsger W. Dijkstra",
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted from the db', async () => {
  const retBlog = await Blog.findOne()
  const blog = retBlog.toJSON()

  await api
    .delete(`/api/blogs/${blog.id}`)
    .expect(204)

  assert(! await Blog.findById(blog.id))
})

test('a blog can be updated', async () => {
  const retBlog = await Blog.findOne()
  const blog = retBlog.toJSON()

  const newBlog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 100,
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blog.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert(
    newBlog.title === updatedBlog.body.title &&
    newBlog.author === updatedBlog.body.author &&
    newBlog.url === updatedBlog.body.url &&
    newBlog.likes === updatedBlog.body.likes
  )
})

after(async () => {
  await mongoose.connection.close()
})