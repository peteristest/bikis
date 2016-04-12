/*
 * PhotosContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchInstagramPhotos } from '../../actions'

const NUM_PHOTOS = 6
const TRANSFORM_SMALL = 'TRANSFORM_SMALL'
const TRANSFORM_LARGE = 'TRANSFORM_LARGE'

const random = (int) => Math.floor(Math.random() * int)
const shuffle = () => 0.5 - Math.random()

const Photo = ({delay, transform, url}) => {
  const offset = 10 - Math.floor(Math.random() * 4) * 5
  const bgTransform = `translate3d(${offset}%, ${offset}%, 0)`
  return <span
    className='image-container inline-block left-0 top-0 absolute'
    style={{transitionDelay: `${delay}ms`}}>
    <span className='image relative inline-block' style={{ transform }}>
      <img
        src={url}
        className='fit relative block' />
      <span className='bg absolute top-0 left-0 right-0 bottom-0' style={{ transform: bgTransform }} />
    </span>
  </span>
}

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

  getTransform (size, index) {
    const transforms = [[32, 30, 1.8], [0, 0, 0.75], [50, 34, 0.5], [0, 85, 0.75], [106, 0, 0.75], [106, 85, 0.75]]
    return {
      scale: transforms[index][2],
      x: transforms[index][0],
      y: transforms[index][1]
    }
  }

  prepareImages (images) {
    return images
      .sort(shuffle)
      .slice(0, NUM_PHOTOS)
      .map((url, i) => {
        const isSmall = Boolean(i)
        const size = isSmall ? TRANSFORM_SMALL : TRANSFORM_LARGE
        const { scale, x, y } = this.getTransform(size, i)
        const delay = isSmall ? random(images.length) : 0

        return {
          url,
          scale,
          x, y,
          delay
        }
      })
  }

  renderPhotos (images, withoutDelay = false) {
    return images.map((image, i) => {
      const { url, scale, x, y, delay } = image
      const d = withoutDelay ? 0 : delay * 15
      const transform = `scale(${scale}) translateX(${x}vw) translateY(${y}vh)`

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
