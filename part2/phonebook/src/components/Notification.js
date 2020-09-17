import React from 'react'

const Notification = ({message,error}) => {
    if (message === null){
        return null
    }
    let classNotification = 'notification'

    if(error){
        classNotification ='error'
    }

    return (
        <div className={classNotification}>
            {message}
        </div>
    )
}


export default Notification