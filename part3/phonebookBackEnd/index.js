require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/contact')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
morgan.token('content' , (req) => {
  if (req.method === 'POST') {
    const body = req.body
    return JSON.stringify(body)
  }
  else return  ' '
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content' ))

app.get('/api/persons', (req,res) => {
  Contact.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/info', (req,res) => {
  Contact.find({})
    .then(persons => {
      const totalPersons = persons.length
      const date = new Date
      res.send(`<p>Phonebook has info for ${totalPersons} people</p>
            <p>${date}</p>`)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then(person => res.json(person))
})

app.delete('/api/persons/:id', (req,res,next) => {

  Contact.findByIdAndRemove(req.params.id)
    .then( () => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })

})

app.post('/api/persons', (req,res,next) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Contact({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })
})


app.put('/api/persons/:id', (req,res, next) => {
  const body = req.body

  const person = {
    number: body.number,
  }

  const options = {
    new: true,
    runValidators: true
  }

  Contact.findByIdAndUpdate(req.params.id, person, options)
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))


})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`)
})
