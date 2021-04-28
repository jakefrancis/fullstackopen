const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Please provide a password: node mongo.js <password>')
  process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://Jake:${password}@part3.1kzc9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

