import React from 'react'

const Note = ({note,toggleImportance,label}) => {
    return (
    <li>
      {note.content}
    <button onClick={toggleImportance}>{label}</button>
    </li>
    )
}

export default Note