import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import Notification from './components/Notification'



const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

  }

  useEffect(hook, [])




  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    }
    
   noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id )
    const changeNote = {...note, important: !note.important}
    noteService
      .update(id,changeNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
<<<<<<< Updated upstream
      `the note ${note.content} was already deleted from the server`
=======
        `Note '${note.content}' was already removed from server` 
>>>>>>> Stashed changes
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    return (
      <div>
        <h1>Notes</h1>
<<<<<<< Updated upstream
        <Notification message={errorMessage} />
=======
        <Notification message={errorMessage}/>
>>>>>>> Stashed changes
        <div>
          <button onClick={() => setShowAll(!showAll)} >
            show {showAll ? 'important': 'all'}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={() => toggleImportance(note.id)}
              label = {'delete'}
            />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input 
          value={newNote}
          onChange={handleNoteChange} 
          />
          <button type='submit'>save</button>
        </form>
        <Footer />
      </div>
    )
  }

  export default App