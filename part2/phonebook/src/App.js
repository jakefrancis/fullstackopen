import React, { useState, useEffect } from "react";
import personService from './services/persons'
import Message from './components/Message'

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
<<<<<<< HEAD
  const [messageType, setMessageType] = useState(null)


  const createNotification =(content,type) => {
    setMessage(content)
    setMessageType(type)
    setTimeout( () => {
      setMessage(null)
      setMessageType(null)
    }, 5000)
  };
=======
  const [error, setError] = useState(false)
>>>>>>> b2fbaf6a73bcdbc6d17fda0099a7281c05867da8

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
<<<<<<< HEAD
          createNotification(`Successfully deleted ${name} from server`, 'notification')
        })
        .catch( error => {
          createNotification(`Information for ${name} has already been removed from the server`, 'error')
=======
          notificationHandler(`${name} has been removed from the phonebok`,false)
>>>>>>> b2fbaf6a73bcdbc6d17fda0099a7281c05867da8
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
<<<<<<< HEAD
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
        
=======
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
>>>>>>> b2fbaf6a73bcdbc6d17fda0099a7281c05867da8
    }


  };

  return (
    <div>
      <h2>Phonebook</h2>
<<<<<<< HEAD
      <Message message={message} messageType={messageType}/>
=======
      <Notification message={message} error={error}/>
>>>>>>> b2fbaf6a73bcdbc6d17fda0099a7281c05867da8
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
