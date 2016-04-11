import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import topojson from 'topojson'

import map from 'json!./../../world-110m.topojson'
import route from 'json!./../../route.topojson'
import cities from 'json!./../../cities.json'

const TYPE_ROUTE = 'route'
const TYPE_CITIES = 'cities'
const PROJECTION_TYPE = 'orthographic'
const DOT_RADIUS = '3px'
const STYLES = {
  'route': {
    'visible': {
      rotation: [-20, -40],
      opacity: 0.5,
      scale: 440,
      duration: 1000
    },
    'hidden': {
      rotation: [-10, -20],
      opacity: 0,
      scale: 240,
      duration: 500
    }
  },
  'cities': {
    'visible': {
      rotation: [50, -40],
      opacity: 0.5,
      scale: 240,
      duration: 1000
    },
    'hidden': {
      rotation: [-10, -20],
      opacity: 0,
      scale: 240,
      duration: 500
    }
  }
}

class WorldMap extends Component {

  componentDidMount () {
    const { color, type, visible } = this.props
    const styles = this.getStyles({ type, visible })
    const opacity = styles.opacity
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight

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
      .translate([width * 0.5, height * 0.5])
      .clipAngle(90)
      .scale(scale)
      .rotate(rotation)

    return projection
  }

  drawMap (world, options) {
    const { svg, path, color, opacity } = options

    svg.append('path')
      .datum(topojson.feature(world, world.objects.land))
      .attr('class', 'land')
      .attr('d', path)
      .style('fill', color)
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
    const { visible, type } = this.props

    const styles = this.getStyles({ type, visible })
    const showRoute = visible && type === TYPE_ROUTE
    const showCities = visible && type === TYPE_CITIES

    const options = {showRoute, showCities, ...styles}
    this.transition(options)
  }

  transition (options) {
    const { duration, rotation, opacity, scale, easing = 'cubic-in-out', showRoute, showCities } = options
    const { projection, path, svg } = this
    const land = svg.selectAll('.land')
    const route = svg.selectAll('.route')
    const cities = svg.selectAll('circle')

    d3.transition()
      .duration(duration)
      .ease(easing)
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
    (this.props.visible !== prevProps.visible) && this.update()
  }

  render () {
    return <div {...this.props} />
  }
}

WorldMap.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  color: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf([TYPE_CITIES, TYPE_ROUTE])
}

export default WorldMap
