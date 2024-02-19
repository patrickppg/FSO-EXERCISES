function dummy(blogs) {
  return 1
}

function totalLikes(blogs) {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

function favoriteBlog(blogs) {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(el => el.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}