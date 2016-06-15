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
      <div>
        <div className='cover top-0 left-0 right-0 bottom-0 fixed' />
        <div className='app height-100'>
          {this.props.children}
        </div>
      </div>
    )
  }

  componentDidMount () {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
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
