import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Quote = ({anecdotes, votes}) => <p> {anecdotes} has {votes} votes </p>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, newVotes] = useState(new Array(6+1).join('0').split('').map(parseFloat))
  const top = votes.indexOf(Math.max(...votes))
  const random = () => {
      let randomVal =  Math.floor(Math.random() * Math.floor(props.anecdotes.length))
      console.log(votes)
      return setSelected(randomVal)
  } 
  
  const voteQuote = () => {
    const copy = [...votes]
    copy[selected] += 1
    
    newVotes(copy)
  }

  
  return (
    <div>
     <Quote anecdotes={props.anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={() => random()} text={'random quote'} />
      <Button onClick={() => voteQuote()} text={'vote'} />
      <Quote anecdotes={props.anecdotes[top]} votes={votes[top]}/>

    </div>
  )
}

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)