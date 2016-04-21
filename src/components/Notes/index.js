import React from 'react'
const Notes = ({text}) => {
  return (
    <div
      className='notes center px3 py2 mb2 border no-pointer-events'
      dangerouslySetInnerHTML={{__html: text}}
    />
  )
}

Notes.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Notes
