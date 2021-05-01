import React from 'react'

const Note = ({ note,toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button id='toggleImportance' onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note