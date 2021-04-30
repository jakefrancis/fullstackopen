import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  login,
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    login({ username,password })
    setUsername('')
    setPassword('')

  }


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={usernameHandler}
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={passwordHandler}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login : PropTypes.func.isRequired
}

export default LoginForm