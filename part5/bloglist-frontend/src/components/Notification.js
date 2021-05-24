import React from 'react'

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className='notification' id='notification'>
      <h2 className={message.type}>{message.content}</h2>
    </div>
  )

}

export default Notification