import React from 'react'

const Note = ({note,toggleImportance}) => {
<<<<<<< Updated upstream
  const label = note.important
    ? 'make not important'
    : 'make important'
=======
    const label = note.important
      ? 'make not important' : 'make important'
>>>>>>> Stashed changes

    return (
    <li className='note'>
      {note.content}
    <button onClick={toggleImportance}>{label}</button>
    </li>
    )
}

export default Note