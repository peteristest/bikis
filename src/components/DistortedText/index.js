import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import raf from 'raf'

import './styles.css'

const FILTER_BASE_FREQUENCY = '0.00001 0.018001'
const FILTER_SEED_BASE = 15
const FILTER_SEED_RANGE = 44

class DistortedText extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animate: false,
      p: 0.5,
      disableFilter: false,
      alternateFilter: true
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
    // IE and Edge only support them within an SVG element
    // todo: explore rendering text within SVG
    const isIE = /Edge|Trident|MSIE/.test(navigator.userAgent)

    this.setState({
      disableFilter: isSafari || isIE
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ alternateFilter: !this.state.alternateFilter })
    }
  }

  getDistortFilter () {
    const id1 = this.props.id + '1'
    const id2 = this.props.id + '2'
    const id = this.state.alternateFilter ? id1 : id2

    const filter = `url("#${id}")`
    return this.state.disableFilter ? null : {filter: filter, WebkitFilter: filter, willChange: 'filter'}
  }

  getSeed (percentage) {
    return (FILTER_SEED_BASE + Math.sin(percentage) * FILTER_SEED_RANGE) << 0
  }

  render () {
    const {content, animated = true} = this.props

    const seed = this.getSeed(this.state.p)
    const distortStyle = this.getDistortFilter()

    const className = classNames(
      this.props.className,
      'distort-text',
      {'distort-text-fallback': this.state.disableFilter}
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
              <filter id={`${this.props.id}1`}>
                <feTurbulence type='turbulence' baseFrequency={FILTER_BASE_FREQUENCY} numOctaves='1' result='warp'></feTurbulence>
                <feDisplacementMap scale={seed} in='SourceGraphic' in2='warp' />
              </filter>
              <filter id={`${this.props.id}2`}>
                <feTurbulence type='turbulence' baseFrequency={FILTER_BASE_FREQUENCY} numOctaves='1' result='warp'></feTurbulence>
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
  animated: PropTypes.boolean,
  // todo: readdress
  url: PropTypes.string
}

export default DistortedText
