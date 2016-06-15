import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import './styles.css'

const getBaseFrequency = (offset) => `0.00001 ${offset + 0.018001}`
const getDistortFilter = (id) => {
  const filter = `url("#${id}")`
  return {filter: filter, WebkitFilter: filter}
}

class DistortedText extends Component {
  constructor (props) {
    super(props)

    const id = `filter${Math.random()}`

    this.id = id
    this.distortFilter = getDistortFilter(id)

    this.state = {
      animate: false,
      p: 0,
      disableFilter: false
    }

    this.handleEnter = this.handleEnter.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
    this.animate = this.animate.bind(this)
  }

  animate () {
    const {p, animate} = this.state
    if (animate) {
      this.setState({
        p: p + 0.075
      })

      window.requestAnimationFrame(this.animate)
    }
  }

  handleEnter (e) {
    this.setState({
      animate: true
    })

    window.requestAnimationFrame(this.animate)
  }

  handleLeave (e) {
    this.setState({
      animate: false
    })
  }

  componentDidMount () {
    // Safari is dishonest about supporting SVG filters
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

    this.setState({
      disableFilter: isSafari
    })
  }

  render () {
    const {content, turbulence = 0.005} = this.props

    const offset = Math.sin(this.state.p) * turbulence
    const baseFrequency = getBaseFrequency(offset)

    const distortStyle = this.state.disableFilter ? null : this.distortFilter
    const className = classNames(
      this.props.className,
      'distort-text',
      {'no-svgfilters': this.state.disableFilter}
    )

    return (
      <span>
        <span
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          className={className}
          style={distortStyle}
          dangerouslySetInnerHTML={{ __html: content }}/>
        {!this.state.disableFilter && (
          <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='absolute'>
            <defs>
              <filter id={`${this.id}`}>
                <feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves='1' result='warp'></feTurbulence>
                <feDisplacementMap scale='30' in='SourceGraphic' in2='warp' />
              </filter>
            </defs>
          </svg>
        )}
      </span>
    )
  }
}

DistortedText.propTypes = {
  content: PropTypes.string.isRequired,
  turbulence: PropTypes.number,
  className: PropTypes.string
}

export default DistortedText
