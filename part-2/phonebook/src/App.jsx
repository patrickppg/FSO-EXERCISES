import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  function handleNameChange(e) {
    setNewName(e.target.value)
  }

  function handleNumberChange(e) {
    setNewNumber(e.target.value)
  }

  function handleFilterChange(e) {
    setFilter(e.target.value)
  }

  function addName(e) {
    e.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`)
      return
    }

    const newNameObject = {
      name: newName,
      number: newNumber,
    }

    document.querySelector('[name=name]').focus()

    setPersons(persons.concat(newNameObject))
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = !filter ? persons : persons.filter((person) => {
    return person.name.toLowerCase().slice(0, filter.length) === filter.toLowerCase()
  })
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App