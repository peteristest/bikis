/*
 * PhotosContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchInstagramPhotos } from '../../actions'

import './styles.css'

const NUM_PHOTOS = 6
const TRANSFORM_SMALL = 'TRANSFORM_SMALL'
const TRANSFORM_LARGE = 'TRANSFORM_LARGE'

const random = (int) => Math.floor(Math.random() * int)
const shuffle = () => 0.5 - Math.random()

const Photo = ({delay, transform, url, bgOffset}) => {
  const bgTransform = `translate3d(${bgOffset}%, ${bgOffset}%, 0)`
  return (
    <span
      className='image-container inline-block left-0 top-0 absolute'
      style={{transitionDelay: `${delay}ms`}}>
      <span className='image relative inline-block' style={{ transform }}>
        <img
          src={url}
          className='fit relative block' />
        <span className='photo-bg absolute top-0 left-0 right-0 bottom-0' style={{ transform: bgTransform }} />
      </span>
    </span>
  )
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
        const bgOffset = 10 - random(4) * 5

        return {
          url,
          scale,
          x, y,
          delay,
          bgOffset
        }
      })
  }

  renderPhotos (images, withoutDelay = false, offset) {
    return images.map((image, i) => {
      const { url, scale, x, y, delay, bgOffset } = image
      const d = withoutDelay ? 0 : delay * 15
      const transformOffset = 0.05 * (3 - scale) * offset
      const transform = `scale(${scale}) translateX(${x + transformOffset}vw) translateY(${y}vh)`

      return <Photo key={i} delay={d} transform={transform} url={url} bgOffset={bgOffset} />
    })
  }

  render () {
    const { images, withoutDelay } = this.state
    const { offset = 0 } = this.props

    return (
      <div className='component photos absolute top-0 left-0 m2 z1' style={{width: '50%'}}>
        {this.renderPhotos(images, withoutDelay, offset)}
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
