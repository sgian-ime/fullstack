import { useState } from 'react'


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodButton = () => () => {
    setGood(good + 1)
  }

  const neutralButton = () => () => {
    setNeutral(neutral + 1)
  }

  const badButton = () => () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={goodButton()}>good</button>
      <button onClick={neutralButton()}>neutral</button>
      <button onClick={badButton()}>bad</button>

      <h1>statistics</h1>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>

    </div>
  )
}

export default App