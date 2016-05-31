import React from 'react'
import './styles.css'

const Gif = ({src, name}) => (
  <span className={`component gif ${name} fixed abs-center`}>
    <img className='gif-image' src={src} />
    <span className='bg absolute top-0 left-0 right-0 bottom-0' />
  </span>
)

export default Gif
