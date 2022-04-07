import { useState, useEffect } from 'react'
import personService from "./services/persons"
import "./index.css"

const Person = ({name, number, removePerson}) => {
  return (  
    <>
      <p>{name}: {number}   <button onClick={removePerson}>Delete</button></p>
    </>
  )
}

const Persons = ({shownPeople, removePeople}) => {
  return (
    <>
      {shownPeople.map(person =>
        <Person 
          key={person.id} 
          name={person.name} 
          number={person.number} 
          removePerson={() => removePeople(person)}
        />
      )}
    </>
  )
}

const Filter = ({searchPersons, newSearch, handleSearchChange}) => {
  return (
    <form onSubmit={searchPersons}>
        search: 
        <input 
          value={newSearch}
          onChange={handleSearchChange}/>
    </form>
  )
}

const PersonForm = ({addPersons, newName, newNumber, handleNameChange, handleNumberChange}) => {
   return (
    <>
      <form onSubmit={addPersons}>
        name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        <br/>
        number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}/>
        <br/>
          <button type="submit">add</button>
      </form>
    </>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [shownPeople, setShownPeople] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
      .catch(error => {
        alert("Could not retrive notes from server!")
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

    personService
      .create(personsObject)
      .then(returnedPeople => {
        setPersons(persons.concat(returnedPeople))
      })
    
    setNotification(`Added ${personsObject.name}`)

    setTimeout(() => {
      setNotification(null)
    }, 5000)

    setNewName('')
    setNewNumber('')
  }

  const removePersonById = (person) => {

    const removedId = person.id

    if (window.confirm(`Delete ${person.name} from the phonebook?`)) {
      personService
        .remove(removedId)
    
      setPersons(persons.filter(person => person.id !== removedId))
    }
  }

  const searchPersons = (event) => {
    
    event.preventDefault()
    setNewSearch(newSearch)
    setShownPeople([])

    var tempArray = []
    
    persons.forEach(person => {
      if (person.name.toLowerCase().includes(newSearch.toLowerCase())) {
        tempArray.push(person)
      }
    })
    setShownPeople(tempArray)
    setNewSearch('')
  }

  return (
    <>
      <h1>Phonebook</h1>

      <Notification message={notification} />

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

      <Persons 
        shownPeople={shownPeople} 
        removePeople={removePersonById}  
      />
    </>
  )
}

export default App