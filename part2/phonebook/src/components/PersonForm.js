import React from 'react'


const PersonForm = (props) => {
  
    const 
    { nameHandler,
      newName,
      numberHandler,
      newNumber,
      addPerson} = props
  
  
  
    return (
      <form>
          <div>
            name: <input onChange={nameHandler} value={newName} />
          </div>
           <div>
            number: <input onChange={numberHandler} value={newNumber} />
          </div>
          <div>
            <button onClick={addPerson} type="submit">add</button>
          </div>
        </form>
      )
    
  }

  
  export default PersonForm