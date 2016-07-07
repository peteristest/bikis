/*
 * WindowWithCursor
 */

import React, { Component } from 'react'
import classNames from 'classnames'

import imgCursor from './cursor.png'

import { isSmallScreen } from './../../utils/env'

export const TOP_LEFT = 'top left'
export const TOP_RIGHT = 'top right'
export const BOTTOM_LEFT = 'bottom left'
export const BOTTOM_RIGHT = 'bottom right'

class WindowWithCursor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: -450,
      y: 450,
      xCursor: 50,
      yCursor: 0
    }

    this.timeouts = []
  }

  componentDidMount () {
    const { position = 'bottom right', delay = 500 } = this.props
    const transitionTime = 600
    const isRight = position.indexOf('right') > -1
    const m = isRight ? -1 : 1

    this.setState({
      xCursor: 10 - 20 * m
    })

    const t01 = setTimeout(() => {
      const x = isSmallScreen() ? 0 : (50 + Math.random() * 50) * m
      this.setState({
        x: x,
        y: 0
      })
    }, delay + transitionTime)

    const t02 = setTimeout(() => {
      this.setState({
        xCursor: 100,
        yCursor: 400
      })
    }, delay + transitionTime * 2)

    this.timeouts = [t01, t02, ...this.timeouts]
  }

  componentWillLeave (cb) {
    const t03 = this.setState({
      xCursor: 10,
      yCursor: 60
    })

    const t04 = setTimeout(() => {
      this.setState({
        y: 450
      })
    }, 400)

    const t05 = setTimeout(cb, 1200)

    this.timeouts = [t03, t04, t05, ...this.timeouts]
  }

  componentWillUnmount () {
    // Clear timeouts
    this.timeouts.map((t) => clearTimeout(t))
  }

  render () {
    const { x, y, xCursor, yCursor } = this.state
    const { position } = this.props

    const containerPosition = `translate3d(${x}px, ${y}px, 0)`
    const cursorPosition = `translate3d(${xCursor}px, ${yCursor}px, 0)`

    const absPosition = `${position} `.split(' ').join('-0 ')
    const className = classNames('notes-container fixed z3 my1 px3 sm-px0', absPosition)
    const isRight = position.indexOf('right')

    const cursorClassName = classNames('absolute cursor top-0 z4 mt1', {
      'right-0': isRight,
      'left-0': !isRight
    })

    return (
      <div className={className} style={{transform: containerPosition}} {...this.props}>
        <Cursor className={cursorClassName} style={{transform: cursorPosition}} />
        {this.props.children}
      </div>
    )
  }
}

WindowWithCursor.propTypes = {
  position: React.PropTypes.oneOf([TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT]),
  delay: React.PropTypes.number
}

WindowWithCursor.defaultProps = {
  position: BOTTOM_RIGHT
}

/* Helpers */
const Cursor = (props) => (
  <img className='cursor' src={imgCursor} {...props} />
)

export default WindowWithCursor
