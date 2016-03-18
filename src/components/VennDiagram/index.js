import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import venn from 'venn.js/build/venn.min.js'
import d3 from 'd3'

const COLOURS = ['#ff7474', '#83ffb1', '#9cfffd', '#e86fff', '#FAE443', '#1D9DF4']

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

class VennDiagram extends Component {

  constructor (props) {
    super(props)
    this.state = {
      order: 0,
      intersectLabel: '*'
    }
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
      intersectLabel: typeof intersectLabel === String ? intersectLabel : getRandomElement(intersectLabel)
    })

    this.updateChart()

    if (animate) {
      this.timeout = setTimeout(this.animate.bind(this, duration), 900)
    }
  }

  animate (duration) {
    this.increment()
    this.interval = setInterval(this.increment.bind(this), duration + 500)
  }

  componentDidUpdate () {
    this.updateChart()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    clearTimeout(this.timeout)
  }

  getData (items, sizePair, sizeTriple, intersectLabel) {
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
  }

  updateChart () {
    const { items, large, small, duration, width, height } = this.props
    const { order, intersectLabel } = this.state

    const chartItems = [...items.slice(order, items.length), ...items.slice(0, order)]

    const chartData = this.getData(chartItems, large, small, intersectLabel)
    const colours = d3.scale.ordinal().range(COLOURS)
    const vennChart = venn.VennDiagram()
      .wrap(false)
      .width(width)
      .height(height)
      .duration(duration)
      .colours(colours)

    const elem = ReactDOM.findDOMNode(this)

    d3
      .select(elem)
      .datum(chartData)
      .call(vennChart)

    d3
      .select(elem)
      .selectAll('.venn-circle path')
      .style('fill-opacity', 0.5)
      .style('mix-blend-mode', 'multiply')

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

export default VennDiagram
