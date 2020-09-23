const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Please provide a password: node mongo.js <password>')
    process.exit()
}

const url = 
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const contactSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)
