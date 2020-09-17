import React from 'react'

const Notification = ({message}) => {
<<<<<<< Updated upstream
    if (message === null){
=======
    if(message === null) {
>>>>>>> Stashed changes
        return null
    }

    return (
<<<<<<< Updated upstream
        <div className="error">
=======
        <div className='error'>
>>>>>>> Stashed changes
            {message}
        </div>
    )
}

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
export default Notification