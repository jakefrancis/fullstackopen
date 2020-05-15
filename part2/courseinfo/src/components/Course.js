import React from 'react'


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
 const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
const Content = ({ parts }) => {
    
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} />
          )}
    </div>
    )
  }

const Total = ({ parts }) => {
    const sum = parts.reduce((sum, parts) => { return sum + parts.exercises}, 0)
    return(
      <h3>Total of {sum} exercises </h3>
    ) 
  }
  

const Course = ({ course }) => {
  
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  
}

export default Course
