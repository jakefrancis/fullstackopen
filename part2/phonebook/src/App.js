import React,{ useState } from 'react'

import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'








const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '123-456-789' },
    { name: 'John Smith', number: '123-456-821'},
    { name: 'Jane Doe', number: '123-654-128'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilter] = useState('')
  const [filterState, setFilterState] = useState(false)
  
  const nameHandler = (event) => {
    
      setNewName(event.target.value)
  }
    
  const numberHandler = (event) => {
    
      setNewNumber(event.target.value)
  }
    
  const filterHandler = (event) => {
        setFilter(event.target.value)
        if(event.target.value !== '') setFilterState(true)
        
        else setFilterState(false)
        
      }
     
     const filtered = filterState
     ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
     : persons
  
    const addPerson = (event) => {
      event.preventDefault()
      const newPerson = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map((person) => person.name)

      if  (!names.includes(newPerson.name)){  
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
      else {
        alert(`${newPerson.name} already exists in phonebook`)
      }
    }
    

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filterHandler={filterHandler} filterName={filterName} />
      <h2>add new number</h2>
        <PersonForm nameHandler={nameHandler} newName={newName} 
        numberHandler={numberHandler} newNumber={newNumber} 
        addPerson={addPerson} 
        />
      <h2>Numbers</h2>
        {filtered.map((person) => 
        <Numbers key={person.name} name={person.name} number={person.number} />
        )
        }
    </div>
  )
}



export default App