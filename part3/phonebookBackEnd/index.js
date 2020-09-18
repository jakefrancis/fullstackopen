const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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


const maxValue = 100000000
let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"   
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"   
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"   
    },
]

app.get('/api/persons', (req,res) => {
        res.json(persons)
})

app.get('/info', (req,res) => {
    const totalPersons = persons.length
    const date = new Date
    res.send(`<p>Phonebook has info for ${totalPersons} people</p>
              <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const idMap = persons.map(person => person.id)
    if(idMap.includes(id)){
    persons = persons.filter(person => person.id !== id)
    
    res.status(204).end()
    }
    else{
    res.status(404).end()
    }

})
const randomId = (max) => {        
    return Math.floor(Math.random() *Math.floor(max))
}

app.post('/api/persons', (req,res) => {
    const body = req.body


    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const names = persons.map(person => person.name)
    const duplicateName = names.includes(body.name)

    if(duplicateName){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: randomId(maxValue),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)  

    res.json(person)
})

/* I wasn't supposed to implement this
app.put('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const body = req.body
    let idMap = persons.map(person => person.id)
    console.log(idMap)
    if (idMap.includes(id)){
    persons = persons.map(person => {
        if(person.id === id){
            person.number = body.number
        }
        return person
    })
        res.json(body)
    }
    else{
        res.status(404).end()
    }

})
*/

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Sever running on port ${PORT}`)
});
