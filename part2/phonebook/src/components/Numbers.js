import React from 'react'

const Numbers = (props) => {
    const {name,number} = props
    return (
    <div>{
        name}: {number}
    </div>
    )
  }
  
  export default Numbers