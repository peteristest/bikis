/*
 * WindowWithCursor
 */

import React, { Component } from 'react'
import classNames from 'classnames'

const Cursor = (props) => (
  <img src='img/cursor.png' {...props} />
)

class WindowWithCursor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: -450,
      y: 450,
      xCursor: 50,
      yCursor: 0
    }
  }

  componentDidMount () {
    const { position = 'bottom right', delay = 500 } = this.props
    const transitionTime = 600
    const isRight = position.indexOf('right') > -1
    const m = isRight ? -1 : 1

    this.setState({
      xCursor: 10 - 20 * m
    })

    setTimeout(() => {
      this.setState({
        x: (50 + Math.random() * 50) * m,
        y: 0
      })
    }, delay + transitionTime)

    setTimeout(() => {
      this.setState({
        xCursor: 100,
        yCursor: 400
      })
    }, delay + transitionTime * 2)
  }

  componentWillLeave (cb) {
    this.setState({
      xCursor: 10,
      yCursor: 60
    })

    setTimeout(() => {
      this.setState({
        y: 450
      })
    }, 400)

    setTimeout(cb, 1200)
  }

  render () {
    const { x, y, xCursor, yCursor } = this.state
    const { position = 'bottom right' } = this.props

    const containerPosition = `translate3d(${x}px, ${y}px, 0)`
    const cursorPosition = `translate3d(${xCursor}px, ${yCursor}px, 0)`

    const className = classNames('notes-container fixed z3 my1', (position + ' ').split(' ').join('-0 '))
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
  position: React.PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right']),
  delay: React.PropTypes.number
}

export default WindowWithCursor
