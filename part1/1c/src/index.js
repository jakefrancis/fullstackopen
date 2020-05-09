import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [value, setValue] = useState(10)

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello('Jake')}>reset to zero</button>
      <button onClick={hello('Donnie')}>reset to zero</button>
      <button onClick={hello('Leigh')}>reset to zero</button>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)