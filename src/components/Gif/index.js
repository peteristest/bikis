import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import classNames from 'classnames'

import './styles.css'

import cloud from './img/cloud.gif'
import technology from './img/technology.gif'
import ai from './img/ai.gif'
import future from './img/future.gif'

const Gif = ({src, className, children}) => (
  <span className={classNames(className, 'component gif fixed abs-center')}>
    <img className='gif-image' src={src} />
    <span className='bg absolute top-0 left-0 right-0 bottom-0' />
    {children}
  </span>
)

Gif.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
}

export const TechnologyGif = () => (
  <Gif className='technology' src={technology}>
    <Helmet title='🖥' />
  </Gif>
)

export const WeirdGif = () => (
  <Gif className='weird' src={future}>
    <Helmet title='🔮' />
  </Gif>
)

export const AiGif = () => (
  <Gif className='ai' src={ai}>
    <Helmet title='👽' />
  </Gif>
)

export const CloudGif = () => (
  <Gif className='cloud' src={cloud}>
    <Helmet title='☁️' />
  </Gif>
)

export default Gif
