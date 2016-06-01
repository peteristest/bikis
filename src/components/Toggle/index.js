import React, { Component } from 'react'
import Draggable from 'react-draggable'
import classNames from 'classnames'

export default class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  resetOffset () {
    this.setState({
      offset: 0
    })

    this.props.onRelease()
  }

  setOffset (e, ui) {
    this.setState({
      offset: this.state.offset + (ui.x - ui.lastX)
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.props.updateOffset(this.state.offset)
    }
  }

  render () {
    const { label, prop, active, onToggle } = this.props
    const position = this.state.offset ? null : {x: 0, y: 0}
    const className = classNames('toggle inline-block', {'toggle-hover': active})

    return (
      <span
        style={{opacity: active ? 1 : ''}}
        onMouseEnter={onToggle.bind(this, true, prop)}
        onMouseLeave={onToggle.bind(this, false, prop)}
        >
        <Draggable
          onDrag={this.setOffset.bind(this)}
          onStop={this.resetOffset.bind(this)}
          position={position}>
          <span className='inline-block toggle-container'>
            <span className='inline-block'>
              <span className={className}
                >{label}</span>
            </span>
          </span>
        </Draggable>
      </span>
    )
  }
}
