/*
 * PhotosContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchInstagramPhotos } from '../../actions'

const NUM_PHOTOS = 9
const DEGREES = 2
const SIZE = 50
const WIDTH = 55
const HEIGHT = 50

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

  prepareImages (images) {
    return images
      .sort(() => 0.5 - Math.random())
      .slice(0, NUM_PHOTOS)
      .map((image, i) => {
        const rotation = Math.floor(Math.random() * DEGREES) - DEGREES * 0.5
        const scale = 1 + (Math.floor(Math.random() * SIZE) - SIZE * 0.5) * 0.01
        const order = Math.floor(Math.random() * images.length)
        const x = Math.floor(Math.random() * WIDTH)
        const y = Math.floor(Math.random() * HEIGHT)

        return {
          url: image,
          rotation,
          scale,
          x,
          y,
          order
        }
      })
  }

  renderImages (images, withoutDelay = false) {
    return images.map((image, i) => {
      const { url, rotation, scale, x, y, order } = image
      const delay = withoutDelay ? 0 : order * 15
      const style = {
        height: 'auto',
        transform: `rotate(${rotation}deg) scale(${scale}) translateX(-${x}vw) translateY(-${y}vh)`
      }
      return (
        <span
          className='image-container inline-block ml2 mt2 mr2 right-0 bottom-0 absolute'
          style={{
            transitionDelay: `${delay}ms`,
            width: '25%'
          }}>
          <span className='image relative inline-block' style={style}>
            <img
              key={i}
              src={url}
              className='fit relative block' />
            <span className='bg absolute top-0 left-0 right-0 bottom-0' />
          </span>
        </span>
      )
    })
  }

  render () {
    const { images, withoutDelay } = this.state

    return (
      <div {...this.props}>
        {this.renderImages(images, withoutDelay)}
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
