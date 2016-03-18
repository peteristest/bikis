/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import VennDiagram from '../VennDiagram/'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class HomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      venn: false
    }
  }

  toggleVenn () {
    this.setState({
      venn: !this.state.venn
    })
  }

  render () {
    const { disciplines } = this.props.data

    const sizeLarge = 9
    const sizeSmall = 3
    const { clientWidth, clientHeight } = window.document.documentElement
    const w = clientWidth * 0.8
    const h = clientHeight * 0.7

    const { venn } = this.state

    return (
      <div className='home height-100'>
        <div className='max-width-1 bio relative z2 height-100 px2 py3'>
          <h1 className='h3'>Peteris Bikis</h1>
          <p>
            Creative Technologist, Designer and Engineer. <a href='//asketicsf.com' target='_blank'>Asketic</a> Co-founder. I'm a <a href='#' onMouseOver={this.toggleVenn.bind(this)}
              onMouseOut={this.toggleVenn.bind(this)}>venn diagram</a> of design, technology, the Internet, cycling, travel, and photography. Currently obsessed with React and functional
            programming. Interested in AI, neural networks and a weirder future <span dangerouslySetInnerHTML={{ __html: '&#128126' }} />
          </p>
          <p>
            <a href='//twitter.com/peteris'>@peteris</a>
          </p>
          <p>
            <a href='mailto:hi@peter.is'>hi@peter.is</a>
          </p>
        </div>
        <ReactCSSTransitionGroup
          transitionName='visualisation'
          transitionEnterTimeout={600}
          transitionLeaveTimeout={300}>
        {venn && (
          <VennDiagram
            key='venn'
            intersectLabel={['👋', '👌']}
            items={disciplines}
            large={sizeLarge}
            small={sizeSmall}
            duration={1000}
            width={w}
            height={h}
            animate
            className='venn absolute z1' />
        )}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage)
