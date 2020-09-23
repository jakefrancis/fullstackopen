const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Please provide a password: node mongo.js <password>')
    process.exit()
}

//DO NOT SAVE PASSWORD TO GIT HUB!!!
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Jake:${password}@part3.1kzc9.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const contactSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: name,
    number: number
})

if(process.argv.length < 4){
    console.log('phonebook')
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
      mongoose.connection.close()
    })
}
else{ contact.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
}