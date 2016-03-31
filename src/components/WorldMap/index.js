import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import topojson from 'topojson'

const STYLES = {
  'visible': {
    rotation: [-20, -40],
    opacity: 0.5,
    scale: 440,
    duration: 1000
  },
  'hidden': {
    rotation: [-60, -20],
    opacity: 0,
    scale: 340,
    duration: 500
  }
}

class WorldMap extends Component {

  componentDidMount () {
    const { visible, color } = this.props

    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    const world = require('json!./../../world-110m.topojson')

    const options = STYLES[ visible ? 'visible' : 'hidden' ]
    const { rotation, scale, opacity } = options

    const projection = d3.geo.orthographic()
      .translate([width * 0.5 * 1.4, height * 0.5 * 1.2])
      .clipAngle(90)
      .scale(scale)
      .rotate(rotation)

    const path = d3.geo.path().projection(projection)
    const elem = ReactDOM.findDOMNode(this)
    const svg = d3.select(elem).append('svg')
                  .attr('width', width)
                  .attr('height', height)

    svg.append('path')
      .datum(topojson.feature(world, world.objects.land))
      .attr('class', 'land')
      .attr('opacity', opacity)
      .attr('d', path)
      .style('fill', color)

    this.projection = projection
    this.path = path
    this.svg = svg
  }

  update () {
    const { visible } = this.props
    const options = STYLES[ visible ? 'visible' : 'hidden' ]

    this.transition(options)
  }

  transition (options) {
    const { duration, rotation, opacity, scale } = options
    const { projection, path, svg } = this
    const p = svg.selectAll('path')

    d3.transition()
      .duration(duration)
      .ease('cubic-in-out')
      .tween('rotate', () => {
        const r = d3.interpolate(projection.rotate(), rotation)
        const o = d3.interpolate(opacity ? 0 : 0.5, opacity)
        const s = d3.interpolate(projection.scale(), scale)

        return (t) => {
          projection.rotate(r(t)).scale(s(t))
          p
            .attr('opacity', o(t))
            .attr('d', path)
        }
      })
      .transition()
  }

  componentDidUpdate () {
    this.update()
  }

  render () {
    return <div {...this.props} />
  }
}

WorldMap.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  color: React.PropTypes.string.isRequired
}

export default WorldMap
