import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({})

  useEffect(() => {
    personService.get()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  function handleNameChange(e) {
    setNewName(e.target.value)
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value)
  }

  function handleFilterChange(e) {
    setFilter(e.target.value)
  }

  function addPerson(e) {
    e.preventDefault()

    const personFound = persons.find((person) => person.name === newName)

    if (personFound) {
      const confirmation = confirm(`${personFound.name} is already added to phonebook, replace the old number with the new one?`)
      if (confirmation) {
        const changedPerson = {...personFound, number: newNumber}
        personService.update(personFound, changedPerson)
          .then((response) => {
            setPersons(persons.map((p) => p.id !== personFound.id ? p : response.data))
            document.querySelector('[name=name]').focus()
            setNewName('')
            setNewNumber('')
            setNotification({
              message: `phone number of ${personFound.name} was updated!`,
              status: 'success'
            })
            setTimeout(() => {
              setNotification({})
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${personFound.name} has already been removed from the server`,
              status: 'fail'
            })
            setTimeout(() => {
              setNotification({})
            }, 5000);
            setPersons(persons.filter((p) => p.id !== personFound.id))
          })
        

      }

      document.querySelector('[name=name]').focus()
      setNewName('')
      setNewNumber('')

      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPersonObject)
      .then((returnPerson) => {
        setPersons(persons.concat(returnPerson))

        setNotification({
          message: `${newName} was added!`,
          status: 'success'
        })  

        setTimeout(() => {
          setNotification({})
        }, 5000);

        document.querySelector('[name=name]').focus()
        setNewName('')
        setNewNumber('')    
      })
  }

  function deletePerson(person) {
    if (!confirm(`Delete ${person.name}?`)) return 
    personService.remove(person)  
    setPersons(persons.filter((p) => p.id !== person.id))
  }

  const personsToShow = !filter ? persons : persons.filter((person) => {
    return person.name.toLowerCase().slice(0, filter.length) === filter.toLowerCase()
  })
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App