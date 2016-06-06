/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import FontFaceObserver from 'fontfaceobserver'

import configureStore from './store'
import getRoutes from './routes'

const fontObserver = new FontFaceObserver('Vollkorn', {})

fontObserver.check().then(() => {
  document.body.classList.add('js-fonts-loaded')
}, () => {
  document.body.classList.remove('js-fonts-loaded')
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={getRoutes()} />
  </Provider>,
  document.getElementById('app')
)
