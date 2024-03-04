function unknownEndpoint(req, res) {
  res.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler(err, req, res, next) {
  if (err.name === 'CastError') {
    res.status(400).json({ error: 'malformatted id' })
    return
  }
  else if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
    return
  }
  else if (err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    res.status(400).json({ error: 'expected "username" to be unique' })
    return
  }

  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}