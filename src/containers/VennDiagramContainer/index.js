/*
 * VennDiagramContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import VennDiagram from './../../components/VennDiagram'

class VennDiagarmContainer extends Component {

  render () {
    const { disciplines } = this.props
    const sizeLarge = 9
    const sizeSmall = 3

    const { clientWidth, clientHeight } = window.document.documentElement
    const w = clientWidth * 0.8 * 0.8
    const h = clientHeight * 0.7 * 0.8

    return (
      <VennDiagram
        intersectLabel={['']}
        items={disciplines}
        large={sizeLarge}
        small={sizeSmall}
        duration={1000}
        width={w}
        height={h}
        animate
        className='component venn fixed abs-center z1 fuzzy' />
    )
  }
}

function mapStateToProps ({ home }) {
  return {
    disciplines: home.disciplines
  }
}

export default connect(
  mapStateToProps
)(VennDiagarmContainer)
