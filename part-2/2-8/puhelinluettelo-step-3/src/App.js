import './App.css';
import {useState} from 'react';

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '040-1231244'
    }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
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


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name: 
            <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            number:
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => {
          return(
            <p key={person.name}>{person.name} {person.number}</p>
          )
        })}
    </div>
  );
}

export default App;
