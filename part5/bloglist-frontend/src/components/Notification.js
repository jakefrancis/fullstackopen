import React from 'react'

const Notification = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className={message.type} id='notification'>
      {message.content}
    </div>
  )

}

export default Notification