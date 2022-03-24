const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  const name1 = props.parts[0].name;
  const name2 = props.parts[1].name;
  const name3 = props.parts[2].name;

  const exercises1 = props.parts[0].exercises;
  const exercises2 = props.parts[1].exercises;
  const exercises3 = props.parts[2].exercises;
  return (
    <div>
      <Part name={name1} exercises={exercises1} />
      <Part name={name2} exercises={exercises2} />
      <Part name={name3} exercises={exercises3} />
    </div>
  )
}

const Total = (props) => {

  const total = props.parts[0].exercises  + props.parts[1].exercises + props.parts[2].exercises 

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>

  )
}

export default App