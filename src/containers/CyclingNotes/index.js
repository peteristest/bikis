/*
 * CyclingNotesContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchCyclingData } from '../../actions'
import Notes from './../../components/Notes'
import timeAgo from 'time-ago'

const ta = timeAgo()

class CyclingNotesContainer extends Component {

  componentWillMount () {
    const { asyncFetchCyclingData } = this.props
    asyncFetchCyclingData()
  }

  render () {
    const { cycling } = this.props

    const when = ta.ago(cycling.date)
    const text = [
      'Rode 2700 miles from Stockholm to Barcelona a few years ago, fixed gear. Still living in past glories.',
      '',
      '   __o  '.replace(/\ /gi, '&nbsp;'),
      ' _`\\<,_ '.replace(/\ /gi, '&nbsp;'),
      '(_)/ (_)',
      '',
      `Other than that, looks like I last went on a ${cycling.distance} mile ride ${when}.`,
      '']
    const notes = text.join('<br />')

    return (
      <Notes text={notes} {...this.props} />
    )
  }
}

function mapStateToProps ({ cycling }) {
  return {
    cycling: cycling
  }
}

export default connect(
  mapStateToProps,
  { asyncFetchCyclingData }
)(CyclingNotesContainer)
