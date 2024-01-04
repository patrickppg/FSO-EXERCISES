function Persons({personsToShow, deletePerson}) {
  return (
    <ul>
      {personsToShow.map((person) =>
        <li key={person.name}>
          <span>{person.name} {person.number} </span>
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      )}
    </ul>

  )
}

export default Persons