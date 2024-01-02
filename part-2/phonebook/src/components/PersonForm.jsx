function PersonForm({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} name='name' autoFocus />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button>add</button>
      </div>
  </form>
  )
}

export default PersonForm