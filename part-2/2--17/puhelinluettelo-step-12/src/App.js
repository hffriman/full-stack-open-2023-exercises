import './App.css';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {useEffect, useState} from 'react'
import personService from './services/personservice'
import Notification from './components/Notification'

const App = () => {
  
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newFilterName, setNewFilterName] = useState('')

  const [showAll, setShowAll] = useState(true)

  const [successMessage, setSuccessMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)  

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
      if (window.confirm(`The name ${sameName.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personObjectNew = {
          name: sameName.name,
          number: newNumber
        }
        updatePerson(sameName.id, personObjectNew)
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')    
        })

        setSuccessMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
    }
  }

  const updatePerson = (id, changedPerson) => {
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => {
          return person.id !== id ? person : returnedPerson
        }))
      }).catch(error => {
        setErrorMessage(`Information of ${changedPerson.name} has already been deleted from the server`)
        setTimeout(() => {
          setErrorMessage(null) 
        }, 5000)
          setPersons(persons.filter(person => person.id !== id))
      })
      setNewName('')
      setNewNumber('')
  }

  const removePerson = (target) => {
    if (window.confirm(`Delete ${target.name}?`)) {
      personService
        .remove(target.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => {
            return person.id !== target.id
          }))
        })
      }
  }

  const showPersons = showAll 
      ? persons 
      : persons.filter(person => person.name.trim().toUpperCase().includes(newFilterName.trim().toUpperCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status="success" message={successMessage}/>
      <Notification status="error" message={errorMessage}/>
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
        removePerson={removePerson}
      />
    </div>
  );
}


export default App;
