import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import venn from 'venn.js/build/venn.min.js'
import d3 from 'd3'

class VennDiagram extends Component {

  componentDidMount () {
    this.updateChart()
    this.fadeIn()
  }

  componentDidUpdate () {
    this.updateChart()
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
      ...groupArray(disciplines, 3).map((pair) => ({
        sets: pair,
        size: sizeTriple
      }))
    ]
  }

  getVennDiagram () {
    return venn.VennDiagram().wrap(false).width(600).height(500)
  }

  updateChart () {
    const { disciplines, large, small } = this.props

    const chartData = this.getData(disciplines, large, small)
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
