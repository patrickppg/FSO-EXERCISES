import { useState } from 'react'


function StatisticLine({text, value}) {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

function Button({text, onClick}) {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

function Statistics(props) {

  if(props.all === 0) {
    return <p>No feedback given</p>
  }
  
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text='good' value={props.good} />
        </tr>
        <tr>
          <StatisticLine text='neutral' value={props.neutral} />
        </tr>
        <tr>
          <StatisticLine text='bad' value={props.bad} />
        </tr>
        <tr>
          <StatisticLine text='all' value={props.all} />
        </tr>
        <tr>
          <StatisticLine text='average' value={props.average} />
        </tr>
        <tr>
          <StatisticLine text='positive' value={`${props.positive}%`} />
        </tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function handleGoodClick() {
    setGood(good + 1)
  }

  function handleNeutralClick() {
    setNeutral(neutral + 1)
  }

  function handleBadClick() {
    setBad(bad + 1)
  }

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0: (good / all) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App