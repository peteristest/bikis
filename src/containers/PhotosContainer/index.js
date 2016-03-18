/*
 * PhotosContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchInstagramPhotos } from '../../actions'

const NUM_PHOTOS = 5
const DEGREES = 2
const SIZE = 50
const WIDTH = 50
const HEIGHT = 10
const TRANSFORM_SMALL = 'TRANSFORM_SMALL'
const TRANSFORM_LARGE = 'TRANSFORM_LARGE'

const random = (int) => Math.floor(Math.random() * int)
const shuffle = () => 0.5 - Math.random()

const Photo = ({delay, transform, url}) => (
  <span
    className='image-container inline-block ml2 mt2 mr2 right-0 bottom-0 absolute'
    style={{transitionDelay: `${delay}ms`}}>
    <span className='image relative inline-block' style={{ transform }}>
      <img
        src={url}
        className='fit relative block' />
      <span className='bg absolute top-0 left-0 right-0 bottom-0' />
    </span>
  </span>
)

class PhotosContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      images: [],
      withoutDelay: false
    }
  }

  componentWillMount () {
    const { asyncFetchInstagramPhotos, images } = this.props
    asyncFetchInstagramPhotos()

    this.setState({
      images: this.prepareImages(images)
    })
  }

  componentWillLeave () {
    this.setState({
      withoutDelay: true
    })
  }

  getTransform (size) {
    switch (size) {
      case TRANSFORM_SMALL:
        return {
          rotation: random(DEGREES) - DEGREES * 0.5,
          scale: 1 + (random(SIZE) - SIZE * 0.5) * 0.01,
          x: random(WIDTH),
          y: random(HEIGHT)
        }
      case TRANSFORM_LARGE:
        return {
          rotation: 0,
          scale: 3.4,
          x: 2,
          y: 0
        }
    }
  }

  prepareImages (images) {
    return images
      .sort(shuffle)
      .slice(0, NUM_PHOTOS)
      .map((url, i) => {
        const isSmall = Boolean(i)
        const size = isSmall ? TRANSFORM_SMALL : TRANSFORM_LARGE
        const { rotation, scale, x, y } = this.getTransform(size)
        const delay = isSmall ? random(images.length) : 0

        return {
          url,
          rotation,
          scale,
          x, y,
          delay
        }
      })
  }

  renderPhotos (images, withoutDelay = false) {
    return images.map((image, i) => {
      const { url, rotation, scale, x, y, delay } = image
      const d = withoutDelay ? 0 : delay * 15
      const transform = `rotate(${rotation}deg) scale(${scale}) translateX(-${x}vw) translateY(-${y}vh)`

      return <Photo key={i} delay={d} transform={transform} url={url} />
    })
  }

  render () {
    const { images, withoutDelay } = this.state

    return (
      <div {...this.props}>
        {this.renderPhotos(images, withoutDelay)}
      </div>
    )
  }
}

function mapStateToProps ({ photos }) {
  return {
    images: photos.images
  }
}

export default connect(
  mapStateToProps,
  { asyncFetchInstagramPhotos }
)(PhotosContainer)
