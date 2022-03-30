import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => <p>{name}: {number}</p>

const Persons = ({shownPeople}) => {
  return (
    <div>
      {shownPeople.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

const Filter = ({searchPersons, newSearch, handleSearchChange}) => {
  return (
    <form onSubmit={searchPersons}>
      <div>
        search: 
        <input 
          value={newSearch}
          onChange={handleSearchChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({addPersons, newName, newNumber, handleNameChange, handleNumberChange}) => {
   return (
    <>
      <form onSubmit={addPersons}>
        <div>name: 
          <input 
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [shownPeople, setShownPeople] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(repsonse => {
        setPersons(repsonse.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addPersons = (event) => {
    
    event.preventDefault()

    // Checks if name already in list
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} already present`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personsObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
  }

  const searchPersons = (event) => {
    
    event.preventDefault()
    setNewSearch(newSearch)
    setShownPeople([])

    var tempArray = []
    console.log(newSearch);
    

    persons.forEach(person => {
      if (person.name.toLowerCase().includes(newSearch.toLowerCase())) {
        tempArray.push(person)
      }
    })
    console.log(tempArray)
    setShownPeople(tempArray)
    setNewSearch('')
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter 
        handleSearchChange={handleSearchChange}
        newSearch={newSearch}
        searchPersons={searchPersons}
      />

      <h3>add a new person</h3>
      
      <PersonForm 
        addPersons={addPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />


      <h3>Numbers</h3>

      <Persons shownPeople={shownPeople} />

    </div>
  )
}

export default App