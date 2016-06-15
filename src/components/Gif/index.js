import React from 'react'
import Helmet from 'react-helmet'

import './styles.css'

import cloud from './img/cloud.gif'
import technology from './img/technology.gif'
import ai from './img/ai.gif'
import future from './img/future.gif'

const Gif = ({src, name, children}) => (
  <span className={`component gif ${name} fixed abs-center`}>
    <img className='gif-image' src={src} />
    <span className='bg absolute top-0 left-0 right-0 bottom-0' />
    {children}
  </span>
)

export const TechnologyGif = () => (
  <Gif name='technology' src={technology}>
    <Helmet title='🖥' />
  </Gif>
)

export const WeirdGif = () => (
  <Gif name='weird' src={future}>
    <Helmet title='🔮' />
  </Gif>
)

export const AiGif = () => (
  <Gif name='ai' src={ai}>
    <Helmet title='👽' />
  </Gif>
)

export const CloudGif = () => (
  <Gif name='cloud' src={cloud}>
    <Helmet title='☁️' />
  </Gif>
)

export default Gif
