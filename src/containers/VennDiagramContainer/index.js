/*
 * VennDiagramContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { asyncFetchSiteContent } from '../../actions'
import VennDiagram from './../../components/VennDiagram'

const MIN_WIDTH = 460
const MIN_HEIGHT = 460
const SCALE_WIDTH = 0.64
const SCALE_HEIGHT = 0.56

class VennDiagarmContainer extends Component {
  componentWillMount () {
    const { asyncFetchSiteContent } = this.props
    asyncFetchSiteContent()
  }

  render () {
    const { disciplines, vennIntersectLabel } = this.props
    const { clientWidth = 0, clientHeight = 0 } = typeof window === 'undefined' ? {} : window.document.documentElement

    const width = clientWidth * SCALE_WIDTH
    const height = clientHeight * SCALE_HEIGHT

    const w = Math.min(width, Math.max(MIN_WIDTH, width))
    const h = Math.max(MIN_HEIGHT, height)

    return (
      <VennDiagram
        intersectLabel={vennIntersectLabel}
        items={disciplines}
        width={w}
        height={h}
        animate
        className='component venn fixed abs-center z1 fuzzy' />
    )
  }
}

function mapStateToProps ({ home }) {
  return {
    disciplines: home.disciplines,
    vennIntersectLabel: home.vennIntersectLabel
  }
}

export default connect(
  mapStateToProps,
  { asyncFetchSiteContent }
)(VennDiagarmContainer)
