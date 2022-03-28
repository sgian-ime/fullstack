import React from "react";

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {

  return (
    <>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </>
  )
}

const Course = ({course}) => {
  const name = course.name
  const parts = course.parts
  
  var sum = parts.map(part => part.exercises)
  sum = sum.reduce((s,p) => s+p) 

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course