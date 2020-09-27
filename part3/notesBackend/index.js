require('dotenv').config()

const express = require('express')
const { response } = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Note = require('./models/note')

app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if(note){
        res.json(note)
      } else{
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note ({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save()
    .then(savedNote => {
      return savedNote.toJSON()
    })
    .then(savedAndFormattedNote => {
      res.json(savedAndFormattedNote)
    })
    .catch(error => next(error))

})


app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  const note ={
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
}
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endopoint ' })

}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'Validation Error') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT)
console.log(`server running on port ${PORT}`)