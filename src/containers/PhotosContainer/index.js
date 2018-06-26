/*
 * PhotosContainer
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncFetchInstagramPhotos } from '../../actions'

import Photos from './../../components/Photos';

class PhotosContainer extends Component {
  componentWillMount () {
    const { asyncFetchInstagramPhotos } = this.props
    asyncFetchInstagramPhotos()
  }

  render () {
    const { images } = this.props

    return images.length ? <Photos images={images} /> : <span />
  }
}

PhotosContainer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
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
