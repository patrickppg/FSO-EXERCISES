const Course = ({course}) => {
  return (
    <li>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </li>
  )
}

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <>
      <ul>
        {parts.map((part) =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
      <p><b>total of <span>{parts.reduce((acc, i) => acc + i.exercises, 0)}</span> exercises</b></p>
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <li>
      <p>{name} <span>{exercises}</span></p>
    </li>
  )
}

export default Course