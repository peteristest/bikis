import React from 'react'
import { supportsMixBlendMode } from './../../utils/env'

const Photo = ({delay, transform, url, bgOffset}) => (
  <span
    className='image-container inline-block left-0 top-0 fixed'
    style={{transitionDelay: `${delay}ms`}}>
    <span className='image relative inline-block' style={{ transform }}>
      <img
        src={url}
        className='fit relative block' />
      {supportsMixBlendMode() && (
        <span
          className='photo-bg absolute top-0 left-0 right-0 bottom-0'
          style={{ transform: `translate3d(${bgOffset}%, ${bgOffset}%, 0)` }} />
      )}
    </span>
  </span>
)

Photo.propTypes = {
  url: React.PropTypes.string.isRequired,
  delay: React.PropTypes.number,
  transform: React.PropTypes.string,
  bgOffset: React.PropTypes.number
}

Photo.defaultProps = {
  delay: 0,
  bgOffset: 0
}

export default Photo
