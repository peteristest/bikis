import React from 'react'
import './styles.css'

import cloud from './img/cloud.gif'
import technology from './img/technology.gif'
import ai from './img/ai.gif'
import future from './img/future.gif'

const Gif = ({src, name}) => (
  <span className={`component gif ${name} fixed abs-center`}>
    <img className='gif-image' src={src} />
    <span className='bg absolute top-0 left-0 right-0 bottom-0' />
  </span>
)

export const TechnologyGif = () => (
  <Gif name='technology' src={technology} />
)

export const WeirdGif = () => (
  <Gif name='weird' src={future} />
)

export const AiGif = () => (
  <Gif name='ai' src={ai} />
)

export const CloudGif = () => (
  <Gif name='cloud' src={cloud} />
)

export default Gif
