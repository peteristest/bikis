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
    const { position = 'right' } = this.props
    const transitionTime = 600
    const delay = 500
    const isRight = position === 'right'
    const m = isRight ? -1 : 1

    this.setState({
      isRight: Boolean(isRight),
      xCursor: 10 - 20 * m
    })

    setTimeout(() => {
      this.setState({
        x: (50 + Math.random() * 200) * m,
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
    const { x, y, xCursor, yCursor, isRight } = this.state

    const containerPosition = `translate3d(${x}px, ${y}px, 0)`
    const cursorPosition = `translate3d(${xCursor}px, ${yCursor}px, 0)`
    const className = classNames('notes-container fixed z3 bottom-0', {
      'right-0': isRight,
      'left-0': !isRight
    })

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
  text: React.PropTypes.oneOf(['left', 'right'])
}

export default WindowWithCursor
