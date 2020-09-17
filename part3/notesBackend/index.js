const express = require('express')
const { response } = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
/*const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}


app.use(requestLogger) */


let refresh = 0

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]


app.get('/', (req, res) => {
    refresh++
    console.log(refresh)
    res.send(`<h1>This page has be loaded ${refresh} times<h1>`)
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if(note){
        res.json(note) 
    }
    else{
        res.status(404).end()
    }
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }


  notes = notes.concat(note)

  res.json(note)
})


app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body
  const idMap = notes.map(note => note.id)
  if(idMap.includes(id)){
    notes = notes.map(note => note.id === id ? body : note)
    res.send(body)
  }
  else{
    res.status(404).end()
  }
  
 
}
  
)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endopoint '})
}
app.use(unknownEndpoint)





const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)