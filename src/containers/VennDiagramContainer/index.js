/*
 * VennDiagramContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

import VennDiagram from './../../components/VennDiagram'

class VennDiagarmContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0
    }
  }

  componentDidMount () {
    this.setState({
      width: window.document.documentElement.clientWidth,
      height: window.document.documentElement.clientHeight
    })
  }

  render () {
    const { disciplines } = this.props
    const sizeLarge = 9
    const sizeSmall = 3

    const { width, height } = this.state

    const w = width * 0.8 * 0.8
    const h = height * 0.7 * 0.8

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
