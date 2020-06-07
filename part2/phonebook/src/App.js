import React, { useState, useEffect } from "react";
import personService from './services/persons'

import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");
  const [filterState, setFilterState] = useState(false);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const dbHook = () => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      }
      )
  }

  useEffect(dbHook,[])
  const removePerson = (event) => {
    const target = event.target
    const id = Number(target.getAttribute("id"))
    const name = target.getAttribute('name')
    const result = window.confirm(`Delete ${name}?`)

    if(result) {
      personService
        .removeEntry(id)
        .then(newEntry => {
          setPersons(persons.filter(person => person.id !== id))
          notificationHandler(`${name} has been removed from the phonebok`,false)
        })
    }
}

  const nameHandler = (event) => {
    setNewName(event.target.value);
  };

  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };

  const filterHandler = (event) => {
    setFilter(event.target.value);
    if (event.target.value !== "") setFilterState(true);
    else setFilterState(false);
  };

  const notificationHandler = (message,error) =>{
    setMessage(`${message}`)
    setError(error)
    setTimeout(()=> {
      setMessage(null)
      setError(error)
    },5000)
    
  }

  const filtered = filterState
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;



  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const names = persons.map((person) => person.name)
    const ids = persons.map((person => person.id))
    if (!names.includes(newPerson.name)) {
      personService
      .create(newPerson)
      .then(newEntry => {
        setPersons(persons.concat(newEntry));
        setNewName("");
        setNewNumber("");
        notificationHandler(`${newPerson.name} has been added to the phonebook`, false)
      })
      
    } else {
      const result = window.confirm(
        `${newPerson.name} is already in the phonebook, replace old
        number with new one?
      `)
      if(result){
        const index = names.indexOf(newPerson.name)
        const id = ids[index]
        console.log(persons)
        console.log(id)
        personService
        .alterNumber(newPerson, id)
        .then(response => {
          const people = [...persons]
          people[index].number = newPerson.number
          setPersons(people)
          setNewName("");
          setNewNumber("");
          notificationHandler(`${newPerson.name} has been updated`,false)
        })
        .catch(error => {
          notificationHandler(`Information for ${newPerson.name} has already been removed from the server`, true)
          setPersons(persons.filter(person => person.id !== id))
          setNewName("");
          setNewNumber("");
        })
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter filterHandler={filterHandler} filterName={filterName} />
      <h2>add new number</h2>
      <PersonForm
        nameHandler={nameHandler}
        newName={newName}
        numberHandler={numberHandler}
        newNumber={newNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {filtered.map((person) => (
        <Numbers 
          key={person.name}
          person ={person} 
          removePerson={removePerson}
        />
      ))}
    </div>
  );
};

export default App;
