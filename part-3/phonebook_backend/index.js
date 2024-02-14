require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()

  Person.countDocuments({})
    .then(count => {
      response.send(
        `
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    response.status(400).json({ error: 'name or number missing' })
    return
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        const contact = {
          name: body.name,
          number: body.number
        }

        Person.findByIdAndUpdate(request.params.id, contact, { new: true })
          .then(updatedPerson => {
            response.json(updatedPerson)
          })
          .catch(error => next(error))
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

function unknownEndpoint(request, response) {
  response.status(400).send({ error: 'unknonwn endpoint' })
}

app.use(unknownEndpoint)

function errorHandler(error, request, response, next) {
  console.log(error.message)

  if (error.name === 'CasteError') {
    response.status(400).json({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})