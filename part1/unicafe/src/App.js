import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.label}</button>
)

const Statistics = (props) => {

  let {good, neutral, bad} = props

  let all = good + neutral + bad

  function getAverage() {
    if (all === 0) {
      return 0
    }
    return (good + bad * -1) / all
  }

  function getPostive() {
    if (good === 0) {
      return 0
    }
    return (good / all) * 100
  }
  
  let average = getAverage()

  let positve = getPostive()

  return (
    <div>

      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all}</p>
      <p>average: {average}</p>
      <p>positive: {positve}%</p>
    </div>
  )
}


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

      <Button handleClick={goodButton()} label={"good"} />
      <Button handleClick={neutralButton()} label={"neutral"} />
      <Button handleClick={badButton()} label={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App