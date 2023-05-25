import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {useEffect, useState} from 'react';
import personService from './services/personservice';

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterName, setNewFilterName] = useState('')

  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setNewFilterName(event.target.value)

    if (newFilterName.trim().length >= 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
 }
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject  = {
      name: newName,
      number: newNumber
    }
    const sameName = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())

    if (sameName) {
      alert(`The name ${personObject.name} is already added to phonebook`)
    }

    else {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')    
        })
    }
  }


  const showPersons = showAll 
      ? persons 
      : persons.filter(person => person.name.trim().toUpperCase().includes(newFilterName.trim().toUpperCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        text="Filter shown with"
        value={newFilterName}
        onChange={handleFilterNameChange}
      />
      
      <h3>Add a new contact</h3>
      <PersonForm
        onSubmit={addPerson}
        textForName="Name:"
        newNameValue={newName}
        handleNewNameOnChange={handleNameChange}
        textForNumber="Number:"
        newNumberValue={newNumber}
        handleNewNumberOnChange={handleNumberChange}
        buttonText="Add"
      />

      <h3>Numbers</h3>
      <Persons
        persons={showPersons}
      />
    </div>
  );
}

export default App;
