import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Toggable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()


  const handleLogin = async (userObject) => {
    try{
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
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




  const createNote = async (noteObject) => {
    try{
      const returnedNote = await noteService.create(noteObject)
      noteFormRef.current.toggleVisibility()
      setNotes(notes.concat(returnedNote))
    }
    catch (exception) {
      setErrorMessage('Note must be longer than five characters')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }





  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id )
    const changeNote = { ...note, important: !note.important }
    noteService
      .update(id,changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch( () => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const noteForm = () => {
    return(
      <Toggable buttonLabel={'new note'} ref={noteFormRef}>
        <NoteForm
          createNote={createNote}
        />
      </Toggable>
    )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ?
        <Toggable buttonLabel={'login'}>
          <LoginForm
            login={handleLogin}
          />
        </Toggable> :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          {noteForm()}

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