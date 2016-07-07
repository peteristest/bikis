import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import venn from 'venn.js/build/venn.min.js'
import d3 from 'd3'
import R from 'ramda'

import './styles.css'

const DURATION = 1000
const SIZE_LARGE = 9
const SIZE_SMALL = 3

class VennDiagram extends Component {

  constructor (props) {
    super(props)
    this.state = {
      order: 0,
      intersectLabel: '*'
    }

    this.animate = this.animate.bind(this)
    this.increment = this.increment.bind(this)
  }

  increment () {
    const { items } = this.props
    this.setState({
      order: (this.state.order + 1) % items.length
    })
  }

  componentDidMount () {
    const { duration, animate = false, intersectLabel } = this.props
    this.setState({
      intersectLabel: typeof intersectLabel === 'string' ? intersectLabel : getRandomElement(intersectLabel)
    })

    this.updateChart()

    if (animate) {
      this.timeout = setTimeout(this.animate(duration), 900)
    }
  }

  animate (duration) {
    this.increment()
    this.interval = setInterval(this.increment, duration + 500)
  }

  componentDidUpdate () {
    this.updateChart()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    clearTimeout(this.timeout)
  }

  updateChart () {
    const { items, large, small, duration, width, height } = this.props
    const { order, intersectLabel } = this.state

    const chartItems = [...items.slice(order, items.length), ...items.slice(0, order)]

    const chartData = groupData(chartItems, large, small, intersectLabel)
    const vennChart = venn.VennDiagram()
      .wrap(false)
      .width(width)
      .height(height)
      .duration(duration)

    const elem = ReactDOM.findDOMNode(this)

    d3
      .select(elem)
      .datum(chartData)
      .call(vennChart)

    d3
      .select(elem)
      .selectAll('.venn-circle path')
      .style('fill-opacity', 0.5)
      .style('fill', 'url(#gradient)')

    d3
      .select(elem)
      .selectAll('.venn-circle text')
      .style('fill', '#fff')
  }

  render () {
    return <div {...this.props} />
  }
}

VennDiagram.propTypes = {
  intersectLabel: React.PropTypes.oneOfType([
    React.PropTypes.string, React.PropTypes.array
  ]).isRequired,
  duration: React.PropTypes.number.isRequired,
  items: React.PropTypes.array.isRequired,
  large: React.PropTypes.number.isRequired,
  small: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  animate: React.PropTypes.bool
}

VennDiagram.defaultProps = {
  duration: DURATION,
  large: SIZE_LARGE,
  small: SIZE_SMALL
}

/* Helpers */
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

const groupArray = (array, elems = 2) => {
  const a = [...Array.from(array), array[0]]
  const temp = a.slice()
  const arr = []

  while (temp.length >= elems) {
    arr.push(temp.slice(0, elems))
    temp.splice(0, elems - 1)
  }

  return arr
}

const groupDataWith = R.curry((groupArray, items, sizePair, sizeTriple, intersectLabel) => {
  return [
    // single items
    ...items.map((discipline) => ({sets: [discipline], size: 12})),

    // pairs
    ...groupArray(items).map((pair) => ({
      sets: pair,
      size: sizePair
    })),

    // triples
    ...groupArray(items, 3).map((triple) => ({
      sets: triple,
      size: sizeTriple
    })),

    {
      sets: items,
      size: sizeTriple,
      label: intersectLabel
    }
  ]
})

const groupData = groupDataWith(groupArray)

export default VennDiagram
