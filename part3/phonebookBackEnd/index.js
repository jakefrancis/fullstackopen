const express = require('express')
const morgan = require('morgan')
const app = express()


app.use(express.json())
const randomRange = 100000000000

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response)=> {
  
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    }
})




let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
    
]

const containsPerson = (obj) => {
    let unique = false

   persons.map( person => {
        if (person.name === obj.name){            
            return unique = true
        }
        })
    return unique
  
}


app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/api/info', (request,response) => {
    const date = new Date()
    const info = `<p> Phone book has info for ${persons.length} people </p>
                  <p>${date}</p>`;
                
    response.send(info)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
   
})

app.delete('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)

    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    response.status(204).end
})

app.post('/api/persons' , (request,response) => {
    let body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing property'
        })
    }

    if(containsPerson(body)){
        return response.status(400).json({
            error: 'name already exists'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * randomRange)
    }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
    
   
})


const PORT = 3001

app.listen(PORT,() => {
    console.log(`listening on on port ${PORT}`)
})


