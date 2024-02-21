function unknownEndpoint(req, res) {
  res.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler(err, req, res, next) {
  switch (err.name) {
    case 'ValidationError': {
      return res.status(400).send({ error: err.message })
    }
    case 'CastError': {
      return res.status(400).send({ error: 'malformatted id' })
    }
  }

  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}