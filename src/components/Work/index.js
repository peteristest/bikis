import React, { PropTypes } from 'react'
import R from 'ramda'

import DistortedTextContainer from './../../containers/DistortedTextContainer'

const Work = ({className, projects}) => {
  const tab = <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  return (
    <div className={className}>
      <DistortedTextContainer
        id='work'
        className='medium-text text-work left-align mb2 inline-block absolute top-0 pt1'
        content='Featured work' />
      <span className='inline-block h4 font-alternative sm-pl2 lh3 mt3'>
        {projects.map((project, i) => {
          const parts = project.split('|')
          const url = R.tail(parts)
          const text = R.head(parts)
          return (
            <span key={i}>{Array(i + 1).fill(tab)}<a target='_blank' href={url}>{text}</a><br /></span>
          )
        })}
      </span>
    </div>
  )
}

Work.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.object,
  projects: PropTypes.arrayOf(PropTypes.string)
}

export default Work
