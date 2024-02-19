function dummy(blogs) {
  return 1
}

function totalLikes(blogs) {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}