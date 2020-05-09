import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick,text}) => (
<button onClick={onClick} >{text}</button>
)

const Stats = ({text, stats}) => (

<tr>
<td>{text}</td>
<td>{stats}</td>
</tr>
)

const Heading = ({text}) => (
<h1>{text}</h1>
)

const Statistics = (props) => {
  console.log(props)

  return (
  <table>
    <tbody>
      <Stats text={'good'} stats={props.good} />
      <Stats text={'neutral'} stats={props.neutral} />
      <Stats text={'bad'} stats={props.bad} />
      <Stats text={'all'} stats={props.all} />
      <Stats text={'average'} stats={props.average}/>
      <Stats text={'positive'} stats={props.positive} />
    </tbody>
  </table>
  )
}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = (good + bad + neutral)
  const average = () => {
    if (all === 0) {
      return 0
    }
    return (good - bad) / all
  }

  const positive = ()  => {
    if (all === 0) {
      return 0
    }
    return good / all
  }
    


  return (
    <div>
      <Heading text={"give feedback"}/>
      <br></br>
        <Button text={'good'} onClick={() => setGood(good + 1)}/>
        <Button text={'neutral'} onClick={() => setNeutral(neutral+ 1)}/>
        <Button text={'bad'} onClick={() => setBad(bad+ 1)}/>
      <br></br>
      <Heading text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad}
      all={all} average={average()} positive={positive()}/>
       
    </div>
  )
}



ReactDOM.render(
  <App />, 
  document.getElementById('root')
)