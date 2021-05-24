import React from 'react'

const Icon = ({ iconName, component, componentTrail = '' }) => {
  return (
    <svg
      className={`${component}__icon${componentTrail}`}
      fill="black"
      width="16px"
      height="16px"
      viewBox="0 0 20 20"
    >
      <use xlinkHref={`/sprite.svg#icon-${iconName}`} />
    </svg>
  )
}

export default Icon
