import React, { PropTypes } from 'react'

const Footer = ({content}) => (
  <div
    className='small font-monospace pb3 mt4 max-width-2 mx-auto center px1 border-box'
    style={{maxWidth: '42em'}}
    dangerouslySetInnerHTML={{ __html: content }} />
)

Footer.propTypes = {
  content: PropTypes.string.isRequired
}

export default Footer
