import './App.css';
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


  const showPersons = showAll ? persons : persons.filter(person => person.name.toUpperCase().includes(newFilterName.toUpperCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input
        value={newFilterName}
        onChange={handleFilterNameChange}
      />
      
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new contact</h2>
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
        {showPersons.map(person => {
          return(
            <p key={person.name}>{person.name} {person.number}</p>
          )
        })}
    </div>
  );
}

export default App;
