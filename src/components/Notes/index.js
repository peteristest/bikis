import React from 'react'

import './styles.css'

const Notes = ({text}) => (
  <div
    className='notes font-monospace small center px2 sm-px3 py2 mb2 border no-pointer-events'
    dangerouslySetInnerHTML={{__html: text}}
  />
)

Notes.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default Notes
