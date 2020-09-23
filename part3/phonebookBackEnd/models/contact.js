const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const url = process.env.DB_URL

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        console.log('connect to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const contactSchema = mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

module.exports = mongoose.model('Contact', contactSchema)