import React from 'react'
import Notification from './Notification'

const Header = ({ message, user, handleLogout }) => {
  /*<h1 className='header__title--title'>Blog Cabin</h1>*/

  return (
    <div className='header'>
      {!message ?
        <div className='header__title'>
          <img className='header__title--logo' src='img/logo-name.png' alt='blog cabin logo'></img>
        </div>
        :
        <div className='header__title'>
          <Notification message={message}/>
        </div>

      }
      {user ?
        <div className='logout'>
          <p className='logout__user'>Hello, {user.name}</p>
          <button className='btn-inline' onClick={handleLogout}>logout</button>
        </div>:
        null
      }
    </div>
  )
}

export default Header