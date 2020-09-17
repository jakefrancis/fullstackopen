import React from 'react'

const Message = ({message, messageType}) => {
    if(message === null){
        return null
    }

    console.log(messageType)

    return (
        <div className={messageType}>
            {message}
        </div>
    )

}

export default Message