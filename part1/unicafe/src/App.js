import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.label}</button>
)

const StatisticsLine = (props) => {
    <p>{props.text}: {props.value}</p>
}

const Statistics = (props) => {

  let {good, neutral, bad} = props
  let all = good + neutral + bad

  // Checks if there have been any statistics submitted yet
  // and exits early if there haven't been
  if (all === 0) {
    return (
      <div>
        <p>No feedback given yet</p>
      </div>
    )
  }

  function getAverage() {
    if (all === 0) {
      return 0
    }
    return (good + bad * -1) / all
  }

  function getPostive() {
    if (good === 0) {
      return "0%"
    }
    return ((good / all) * 100) + '%'
  }
  
  let average = getAverage()

  let positve = getPostive()

  return (
    <div>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positve}/>
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
      <p>Statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App