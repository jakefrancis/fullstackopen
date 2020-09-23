const mongoose = require('mongoose')

const url = 
 `mongodb+srv://Jake:${password}@part3.1kzc9.mongodb.net/note-app?retryWrites=true&w=majority`

 mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

 const noteSchema = new mongoose.Schema({
     content: String,
     date: Date,
     important: Boolean,
 })

 const Note = mongoose.model('Note', noteSchema)

 const note = new Note({
     content: 'I love my wife!',
     date: new Date(),
     important: true,
 })

 /*note.save().then(result => {

     console.log('note saved!')
     mongoose.connection.close()
 })*/

 Note.find({}).then(result => {
     result.forEach(note => {
         console.log(note)
     })
     mongoose.connection.close()
 })