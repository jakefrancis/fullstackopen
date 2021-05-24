import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'


const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username,password })
    setUsername('')
    setPassword('')
  }

  return (
    <form className='login' onSubmit={handleLogin} id='loginForm'>
      <Icon component='login' iconName='lock-closed-outline'/>
      <div className='login__input'>
        <label className='login__label'>Username</label>
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={usernameHandler}
          label='Username:'
        />
      </div>
      <div className='login__input'>
        <label className='login__label'>Password</label>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={passwordHandler}
        />
      </div>
      <button className='btn-inline' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginForm