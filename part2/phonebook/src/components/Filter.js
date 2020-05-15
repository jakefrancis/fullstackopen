import React from 'react'

const Filter = (props) => {
    const {filterHandler, filterName} =  props
    return (
    <div>
          filter shown with<input onChange={filterHandler} value={filterName} />
    </div>
    )
  }

  export default Filter