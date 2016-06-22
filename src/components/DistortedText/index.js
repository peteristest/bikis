import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import raf from 'raf'

import './styles.css'

const getBaseFrequency = (offset) => `0.00001 ${offset + 0.018001}`
const getDistortFilter = (id) => {
  const filter = `url("#${id}")`
  return {filter: filter, WebkitFilter: filter}
}

class DistortedText extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animate: false,
      p: 0.5,
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
        p: p + 0.2
      })

      setTimeout(() => raf(this.animate), 30)
    }
  }

  handleEnter (e) {
    this.setState({
      animate: true
    })

    raf(this.animate)
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
    const {content, animated = true} = this.props
    const baseFrequency = getBaseFrequency(0)
    const seed = Math.floor(Math.sin(this.state.p) * 44 + 15)

    const id = this.props.id

    const distortStyle = this.state.disableFilter ? null : getDistortFilter(id)
    const className = classNames(
      this.props.className,
      'distort-text',
      {'no-svgfilters': this.state.disableFilter}
    )

    return (
      <span>
        <span
          onMouseEnter={animated && this.handleEnter}
          onMouseLeave={animated && this.handleLeave}
          className={className}
          style={distortStyle}
          dangerouslySetInnerHTML={{ __html: content }}/>
        {!this.state.disableFilter && (
          <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='absolute'>
            <defs>
              <filter id={id}>
                <feTurbulence type='turbulence' baseFrequency={baseFrequency} numOctaves='1' result='warp'></feTurbulence>
                <feDisplacementMap scale={seed} in='SourceGraphic' in2='warp' />
              </filter>
            </defs>
          </svg>
        )}
      </span>
    )
  }
}

DistortedText.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  turbulence: PropTypes.number,
  className: PropTypes.string,
  animated: PropTypes.boolean
}

export default DistortedText
