import React from 'react'
import './styles.css'

const Gif = ({src, name}) => (
  <span className={`component gif ${name} fixed abs-center`}>
    <img className='gif-image' src={src} />
    <span className='bg absolute top-0 left-0 right-0 bottom-0' />
  </span>
)

export const TechnologyGif = () => (
  <Gif name='technology' src='https://media.giphy.com/media/jy7Ipmx7Zeb0k/giphy.gif' />
)

export const WeirdGif = () => (
  <Gif name='weird' src='https://media.giphy.com/media/QTKpNChuRixKo/giphy.gif' />
)

export const AiGif = () => (
  <Gif name='ai' src='https://media.giphy.com/media/IWoZqzqk7LZn2/giphy.gif' />
)

export const CloudGif = () => (
  <Gif name='cloud' src='https://media.giphy.com/media/OT2lwSsUgpsT6/giphy.gif' />
)

export default Gif
