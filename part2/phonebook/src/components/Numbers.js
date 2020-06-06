import React from 'react'

const Numbers = (props) => {
    const {person, removePerson} = props
    return (
    <div>
        <span>{person.name}: {person.number}</span><span> </span>
        <button name={person.name} id={person.id} onClick={removePerson}>delete</button>
    </div>
    )
  }
  
  export default Numbers