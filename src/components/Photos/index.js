/*
 * PhotosContainer
 */

import React, { Component, PropTypes } from 'react'
import R from 'ramda'

import './styles.css'

import Photo from './../Photo'

const NUM_PHOTOS = 6
const TRANSFORM_SMALL = 'TRANSFORM_SMALL'
const TRANSFORM_LARGE = 'TRANSFORM_LARGE'
const TRANSFORMS_MAP = [[32, 30, 1.8], [0, 0, 0.75], [50, 34, 0.5], [0, 85, 0.75], [106, 0, 0.75], [106, 85, 0.75]]

class Photos extends Component {

  constructor (props) {
    super(props)
    this.state = {
      images: [],
      withoutDelay: false
    }
  }

  componentWillMount () {
    const { images, imagesToShow } = this.props

    this.setState({
      images: prepareImages(images, imagesToShow)
    })
  }

  componentWillLeave () {
    this.setState({
      withoutDelay: true
    })
  }

  renderPhotos (images, withoutDelay = false) {
    return images.map((image, i) => {
      const { url, scale, x, y, delay, bgOffset } = image
      const d = withoutDelay ? 0 : delay * 15
      const transform = `scale(${scale}) translateX(${x}vw) translateY(${y}vh)`

      return <Photo key={i} delay={d} transform={transform} url={url} bgOffset={bgOffset} />
    })
  }

  render () {
    const { images, withoutDelay } = this.state

    return (
      <div className='component photos absolute top-0 left-0 m2 z1' style={{width: '50%'}}>
        {this.renderPhotos(images, withoutDelay)}
      </div>
    )
  }
}

Photos.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  imagesToShow: PropTypes.number
}

Photos.defaultProps = {
  imagesToShow: NUM_PHOTOS
}

/* Helpers */
const random = (int) => Math.floor(Math.random() * int)
const shuffle = () => 0.5 - Math.random()
const getTransformFromMap = R.curry((map, size, index) => {
  const transform = map[index]
  return {
    scale: transform[2],
    x: transform[0],
    y: transform[1]
  }
})

const getTransform = getTransformFromMap(TRANSFORMS_MAP)

const prepareImages = (images, imagesToShow) => (
  images
    .sort(shuffle)
    .slice(0, imagesToShow)
    .map((url, i) => {
      const isSmall = Boolean(i)
      const size = isSmall ? TRANSFORM_SMALL : TRANSFORM_LARGE
      const { scale, x, y } = getTransform(size, i)
      const delay = isSmall ? random(images.length) : 0
      const bgOffset = 10 - random(4) * 5

      return {
        url,
        scale,
        x, y,
        delay,
        bgOffset
      }
    })
)

export default Photos
