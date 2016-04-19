import React from 'react'
const Notes = ({text}) => {
  return (
    <div
      className='fixed bottom-0 x-center z3 notes black center px3 py2 mb2 border'
      dangerouslySetInnerHTML={{__html: text}}
    />
  )
}

Notes.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Notes
