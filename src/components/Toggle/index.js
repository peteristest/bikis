import React, { Component, PropTypes } from 'react'
import Draggable from 'react-draggable'
import classNames from 'classnames'
import './styles.css'

export default class Toggle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dragging: false,
      hover: false,
      offset: 0
    }
  }

  resetOffset () {
    this.setState({
      dragging: false,
      hover: false,
      offset: 0
    })

    this.props.handleRelease()
  }

  setOffset (e, ui) {
    this.setState({
      dragging: true,
      offset: this.state.offset + (ui.x - ui.lastX)
    })
  }

  onToggle (hover) {
    if (this.state.dragging || this.props.disabled) { return }

    this.setState({
      hover
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const { id, handleOffset, handleToggle } = this.props
    const { hover, offset } = this.state

    if (prevState.offset !== offset) {
      handleOffset(offset)
    }

    if (prevState.hover !== hover) {
      handleToggle(hover, id)
    }
  }

  render () {
    const { label, active, disabled } = this.props
    const position = this.state.offset ? null : {x: 0, y: 0}

    const className = classNames('toggle inline-block', {
      'toggle-hover': active,
      'transition-opacity': disabled,
      'transition-transform': !disabled
    })

    const labelContent = label.split('').map((letter, i) => (
      <span
        className='inline-block'
        style={{animationDelay: `${i * 50}ms`}}
        dangerouslySetInnerHTML={{ __html: letter.replace(' ', '&nbsp;') }} />
    ))

    return (
      <span
        style={{opacity: active ? 1 : ''}}
        onMouseEnter={this.onToggle.bind(this, true)}
        onMouseLeave={this.onToggle.bind(this, false)}
        >
        <Draggable
          onDrag={this.setOffset.bind(this)}
          onStop={this.resetOffset.bind(this)}
          position={position}>
          <span className='inline-block'>
            <span className={className}>{labelContent}</span>
          </span>
        </Draggable>
      </span>
    )
  }
}

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  handleToggle: PropTypes.func,
  handleOffset: PropTypes.func,
  handleRelease: PropTypes.func
}

export default Toggle
