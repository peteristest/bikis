/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

class HomePage extends Component {
  render () {
    return (
      <div className='max-width-2'>
        <h1 className='h3'>Peteris Bikis</h1>
        <p>
          Creative Technologist, Designer and Engineer. <a href='//asketicsf.com' target='_blank'>Asketic</a> Co-founder. I'm a venn diagram of design, technology, the Internet, cycling, travel, and photography. Currently obsessed with React and functional programming. Interested in AI, neural networks and a weirder future &#128126;
        </p>
        <p>
          <a href='//twitter.com/peteris'>@peteris</a>
        </p>
        <p>
          <a href='mailto:hi@peter.is'>hi@peter.is</a>
        </p>
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
