import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {useState} from 'react';

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterName, setNewFilterName] = useState('')

  const [showAll, setShowAll] = useState(true)

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
      const personListNew = persons.concat(personObject)
      setPersons(personListNew)
      setNewName('')
      setNewNumber('')
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
