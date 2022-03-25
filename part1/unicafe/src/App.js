import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.label}</button>
)

const Statistics = (props) => {

  let good = props.goodArr[0]
  let neutral = props.neutralArr[0]
  let bad = props.badArr[0]

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
      <h1>give feedback</h1>

      <Button handleClick={props.goodArr[1]} label={"good"} />
      <Button handleClick={props.neutralArr[1]} label={"neutral"} />
      <Button handleClick={props.badArr[1]} label={"bad"} />

      <h1>statistics</h1>

      <p>good: {props.goodArr[0]}</p>
      <p>neutral: {props.neutralArr[0]}</p>
      <p>bad: {props.badArr[0]}</p>
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

      <Statistics goodArr={[good, goodButton()]} neutralArr={[neutral, neutralButton()]} badArr={[bad, badButton()]}/>

    </div>
  )
}

export default App