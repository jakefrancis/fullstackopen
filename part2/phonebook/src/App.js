import React, { useState, useEffect } from "react";
import personService from './services/persons'
import Message from './components/Message'

import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import PersonForm from "./components/PersonForm";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilter] = useState("");
  const [filterState, setFilterState] = useState(false);
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)


  const createNotification =(content,type) => {
    setMessage(content)
    setMessageType(type)
    setTimeout( () => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  };

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
          createNotification(`Successfully deleted ${name} from server`, 'notification')
        })
        .catch( error => {
          createNotification(`Information for ${name} has already been removed from the server`, 'error')
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

  const filtered = filterState
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;


  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const names = persons.map((person) => person.name);

    if (!names.includes(newPerson.name)) {
      personService
      .create(newPerson)
      .then(newEntry => {
      setPersons(persons.concat(newEntry));
      setNewName("");
      setNewNumber("");
      createNotification(`Added ${newPerson.name}`, 'notification')
      })
      
    } else {
       let confirmation = window.confirm(`${newPerson.name} has already been added to the phonebook, replace the old number with the new one?`);
        if (confirmation){
         let id;
         let updatePersons = persons.map(person => {
            if(person.name === newName){
              person.number = newNumber
              id = person.id
          }
          return person
        })
          personService
          .alterNumber(newPerson, id)
          .then( () => {
            setPersons(updatePersons);
            setNewName("");
            setNewNumber("")
            createNotification(`Updated the number for ${newPerson.name}`, 'notification')
          })
        }    
        
    }


  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} messageType={messageType}/>
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
