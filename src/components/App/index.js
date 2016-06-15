/**
 *
 * App
 *
 */

import React, { Component } from 'react'
import { provideHooks } from 'redial'

import { asyncFetchInstagramPhotos, asyncFetchCyclingData, asyncFetchSiteContent } from '../../actions'

import './styles.css'

class App extends Component {
  render () {
    return (
      <div className='height-100'>
        {this.props.children}
      </div>
    )
  }
}

const hooks = {
  fetch: ({ dispatch }) => dispatch(asyncFetchSiteContent()),
  defer: ({ dispatch }) => [
    dispatch(asyncFetchInstagramPhotos()),
    dispatch(asyncFetchCyclingData())
  ]
}

export default provideHooks(hooks)(App)
