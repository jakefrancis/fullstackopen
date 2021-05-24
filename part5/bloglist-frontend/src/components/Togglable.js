import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='toggle'>
      <div style={hideWhenVisible}>
        <button className='btn-inline show__blogform__btn'onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='toggle' style={showWhenVisible}>
        <button className='btn-inline show__blogform__btn' onClick={toggleVisibility}>cancel</button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable