import React, { PropTypes } from 'react'

import DistortedTextContainer from './../../containers/DistortedTextContainer'
import { slantedText } from './../../utils/format'

const Awards = ({className, awards}) => {
  const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

  return (
    <div className={className}>
      <p className='sm-ml3 sm-pr3 relative pl4'>
        <DistortedTextContainer
          id='awards'
          className='medium-text text-awards right-align block absolute left-0 lh1'
          turbulence={0.0015}
          content={slantedText('Awards')} />
        <span className='h4 font-alternative inline-block lh3 mt3'>
          {awards.map((award, i) => (
            <span key={i}>{Array(i + 1).fill(tab)}{award}<br /></span>
          ))}
        </span>
      </p>
    </div>
  )
}

Awards.propTypes = {
  className: PropTypes.string.isRequired
}

export default Awards
