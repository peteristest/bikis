import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import topojson from 'topojson'

import './styles.css'

const map = require('./../../world-110m.json')
const route = require('./../../route.json')
const cities = require('./../../cities.json')

const TYPE_ROUTE = 'route'
const TYPE_CITIES = 'cities'
const PROJECTION_TYPE = 'collignon'
const DOT_RADIUS = '3px'
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
      opacity: 0,
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
      opacity: 0,
      scale: 10,
      duration: 500
    }
  }
}

class WorldMap extends Component {

  componentDidMount () {
    require('d3-geo-projection/d3.geo.projection')
    const { color, type, visible } = this.props
    const styles = this.getStyles({ type, visible })
    const opacity = styles.opacity
    const width = Math.min(890, document.documentElement.clientWidth)
    const height = Math.min(500, document.documentElement.clientHeight)

    // Set projection
    const options = { projectionType: PROJECTION_TYPE, width, height, ...styles }
    const projection = this.setProjection(d3, options)
    const path = d3.geo.path().projection(projection)

    // Create d3 SVG
    const elem = ReactDOM.findDOMNode(this)
    const svg = d3.select(elem).append('svg')
                  .attr('width', width)
                  .attr('height', height)

    // Draw elements
    this.drawMap(map, {svg, opacity, path, color})
    this.plotRoute(route, {svg, opacity, path, color})
    this.plotCities(cities, {radius: DOT_RADIUS, svg, opacity, projection, color})

    // Register vars
    this.opacity = opacity
    this.routeOpacity = 0
    this.citiesOpacity = 0
    this.svg = svg
    this.projection = projection
    this.path = path
  }

  getStyles ({ type = 'route', visible }) {
    return STYLES[ type ][ visible ? 'visible' : 'hidden' ]
  }

  setProjection (d3, options) {
    const { width, height, projectionType, scale, rotation } = options

    const projection = d3.geo[projectionType]()
      .translate([width * 0.5, height * 0.5 + 90])
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
      .attr('opacity', opacity)
      .attr('r', radius)
      .attr('fill', color)
  }

  update () {
    const { visible, type, offset } = this.props

    const styles = this.getStyles({ type, visible })
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
    (this.props.visible !== prevProps.visible || (this.props.visible && this.props.offset !== prevProps.offset)) && this.update()
  }

  render () {
    return <div {...this.props} />
  }
}

WorldMap.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  color: React.PropTypes.string.isRequired,
  offset: React.PropTypes.number,
  type: React.PropTypes.oneOf([TYPE_CITIES, TYPE_ROUTE])
}

export default WorldMap
