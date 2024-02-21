function unknownEndpoint(req, res) {
  res.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}