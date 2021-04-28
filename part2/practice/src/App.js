import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ 
        username, password
      })
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })

  }

  useEffect(hook, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])




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
      console.log(returnedNote)
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }
  
  const passwordHandler = (event) => {
    setPassword(event.target.value)
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
        `Note '${note.content}' was already removed from server` 
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

      <Notification message={errorMessage} />

      {user === null ? 
        <LoginForm 
          password={password} 
          username={username} 
          usernameHandler={usernameHandler}
          passwordHandler={passwordHandler}
          handleLogin={handleLogin}
          /> : 
        <div>
          <p>{user.name} logged-in</p>
          <NoteForm 
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
          />
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
    )
  }

  export default App