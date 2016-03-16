import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import venn from 'venn.js/build/venn.min.js'
import d3 from 'd3'

class VennDiagram extends Component {

  constructor (props) {
    super(props)
    this.state = {
      order: 0
    }

    this.interval = setInterval(this.increment.bind(this), 1000)
  }

  increment () {
    const { disciplines } = this.props
    this.setState({
      order: (this.state.order + 1) % disciplines.length
    })
  }

  componentDidMount () {
    this.updateChart()
    this.fadeIn()

    this.timeout = setTimeout(this.increment.bind(this), 100)
  }

  componentDidUpdate () {
    this.updateChart()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    clearTimeout(this.timeout)
  }

  fadeIn () {
    const elem = ReactDOM.findDOMNode(this)
    elem.style.opacity = 0
    elem.style.transition = 'opacity 350ms'
    window.requestAnimationFrame(() => {
      setTimeout(() => { elem.style.opacity = 1 }, 100)
    })
  }

  getData (disciplines, sizePair, sizeTriple) {
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
      ...disciplines.map((discipline) => ({sets: [discipline], size: 12})),

      // pairs
      ...groupArray(disciplines).map((pair) => ({
        sets: pair,
        size: sizePair
      })),

      // triples
      ...groupArray(disciplines, 3).map((triple) => ({
        sets: triple,
        size: sizeTriple
      })),

      {
        sets: disciplines,
        size: sizeTriple,
        label: '😀'
      }
    ]
  }

  getVennDiagram () {
    return venn.VennDiagram().wrap(false).width(600).height(500)
  }

  updateChart () {
    const { disciplines, large, small } = this.props
    const { order } = this.state

    const items = [...disciplines.slice(order, disciplines.length), ...disciplines.slice(0, order)]

    const chartData = this.getData(items, large, small)
    const vennChart = this.getVennDiagram()
    const elem = ReactDOM.findDOMNode(this)

    d3
      .select(elem)
      .datum(chartData)
      .call(vennChart)
  }

  render () {
    return <div {...this.props} />
  }
}

export default VennDiagram
