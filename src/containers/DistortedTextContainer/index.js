import React, { Component } from 'react'
import { connect } from 'react-redux'
import DistortedText from './../../components/DistortedText'

class DistortedTextContainer extends Component {
  render () {
    return (
      <DistortedText
        {...this.props} />
    )
  }
}

function mapStateToProps ({ ui }, ownProps) {
  return {
    location: ui.location
  }
}

export default connect(
  mapStateToProps
)(DistortedTextContainer)
