import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import topojson from 'topojson'
import raf from 'raf'

import './styles.css'

const map = require('./../../world-110m.json')
const route = require('./../../route.json')
const cities = require('./../../cities.json')

export const TYPE_ROUTE = 'route'
export const TYPE_CITIES = 'cities'

const PROJECTION_TYPE = 'collignon'
const DOT_RADIUS = '3px'
const MAX_WIDTH = 890
const MAX_HEIGHT = 500
const OFFSET_Y = 90
const STYLES = {
  'route': {
    'visible': {
      rotation: [-20, -40],
      opacity: 0.5,
      scale: 200,
      duration: 1000
    },
    'hidden': {
      rotation: [-80, -20],
      opacity: 0.01,
      scale: 10,
      duration: 500
    }
  },
  'cities': {
    'visible': {
      rotation: [20, -40],
      opacity: 0.5,
      scale: 160,
      duration: 1000
    },
    'hidden': {
      rotation: [-60, -20],
      opacity: 0.01,
      scale: 10,
      duration: 500
    }
  }
}

class WorldMap extends Component {

  constructor (props) {
    super(props)

    this.state = {
      width: 0,
      height: 0
    }

    this.update = this.update.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount () {
    require('d3-geo-projection/d3.geo.projection')

    // Listen for browser dimension changes
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    // Draw elements
    const { color, type, visible } = this.props
    const styles = getStyles({ type, visible })
    const opacity = styles.opacity

    const elem = ReactDOM.findDOMNode(this.refs.svg)
    const svg = d3.select(elem)

    this.drawMap(map, {svg, opacity, path: this.path, color})
    this.plotRoute(route, {svg, opacity, path: this.path, color})
    this.plotCities(cities, {radius: DOT_RADIUS, svg, opacity, projection: this.projection, color})

    // Register vars
    this.opacity = opacity
    this.routeOpacity = 0
    this.citiesOpacity = 0
    this.svg = svg
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize () {
    const { type, visible } = this.props
    const styles = getStyles({ type, visible })

    const width = Math.min(MAX_WIDTH, document.documentElement.clientWidth)
    const height = Math.min(MAX_HEIGHT, document.documentElement.clientHeight)

    // Set projection
    const options = { projectionType: PROJECTION_TYPE, width, height, ...styles }
    const projection = this.setProjection(d3, options)
    const path = d3.geo.path().projection(projection)

    // Update width and height
    this.setState({ width, height })

    // Register projection and path
    this.projection = projection
    this.path = path
  }

  setProjection (d3, options) {
    const { width, height, projectionType, scale, rotation } = options

    const projection = d3.geo[projectionType]()
      .translate([width * 0.5, height * 0.5 + OFFSET_Y])
      .clipAngle(90)
      .scale(scale)
      .rotate(rotation)

    return projection
  }

  drawMap (world, options) {
    const { svg, path, opacity } = options

    svg.append('path')
      .datum(topojson.feature(world, world.objects.land))
      .attr('class', 'land')
      .attr('d', path)
      .style('fill', 'url(#gradient)')
      .attr('opacity', opacity)
  }

  plotRoute (route, options) {
    const { opacity, svg, path, color } = options

    svg.append('path')
      .datum(topojson.feature(route, route.objects.route_line))
      .attr('class', 'route')
      .attr('d', path)
      .attr('stroke', color)
      .attr('opacity', opacity)
  }

  plotCities (cities, options) {
    const { opacity, projection, color, svg, radius } = options

    svg.selectAll('circle')
      .data(cities).enter()
      .append('circle')
      .attr('cx', (d) => projection(d)[0])
      .attr('cy', (d) => projection(d)[1])
      .attr('opacity', opacity === 0.01 ? 0 : opacity)
      .attr('r', radius)
      .attr('fill', color)
  }

  update () {
    const { visible, type, offset } = this.props

    const styles = getStyles({ type, visible })
    const showRoute = visible && type === TYPE_ROUTE
    const showCities = visible && type === TYPE_CITIES

    const options = {showRoute, showCities, ...styles}
    this.transition(options, offset)
  }

  transition (options, offset = 0) {
    const { duration, opacity, scale, easing = 'cubic-in-out', showRoute, showCities } = options
    const { projection, path, svg } = this
    const land = svg.selectAll('.land')
    const route = svg.selectAll('.route')
    const cities = svg.selectAll('circle')

    const rotation = [ options.rotation[0] + offset, options.rotation[1] ]

    d3.transition()
      .duration(offset ? 300 : duration)
      .ease(offset ? 'cubic-out' : easing)
      .tween('rotate', () => {
        const r = d3.interpolate(projection.rotate(), rotation)
        const o = d3.interpolate(this.opacity, opacity)
        const s = d3.interpolate(projection.scale(), scale)

        const oCities = d3.interpolate(this.citiesOpacity, showCities ? 1 : 0)
        const oRoute = d3.interpolate(this.routeOpacity, showRoute ? 1 : 0)

        return (t) => {
          this.opacity = o(t)
          this.routeOpacity = oRoute(t)
          this.citiesOpacity = oCities(t)

          projection.rotate(r(t)).scale(s(t))

          land
            .attr('opacity', this.opacity)
            .attr('d', path)

          route
            .attr('opacity', this.routeOpacity)
            .attr('d', path)

          cities
            .attr('opacity', this.citiesOpacity)
            .attr('cx', (d) => projection(d)[0])
            .attr('cy', (d) => projection(d)[1])
        }
      })
  }

  componentDidUpdate (prevProps) {
    const { visible, offset, type } = this.props

    if (visible !== prevProps.visible ||
     (visible && offset !== prevProps.offset) ||
     (type !== prevProps.type)) {
      raf(this.update)
    }
  }

  render () {
    return (
      <div {...this.props}>
        <svg ref='svg' width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}

WorldMap.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  color: React.PropTypes.string.isRequired,
  offset: React.PropTypes.number,
  type: React.PropTypes.oneOf([TYPE_CITIES, TYPE_ROUTE])
}

/* Helpers */
function getStyles ({ type = TYPE_ROUTE, visible }) {
  return STYLES[ type ][ visible ? 'visible' : 'hidden' ]
}

export default WorldMap
