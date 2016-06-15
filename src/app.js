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
import { Router, browserHistory, match } from 'react-router'
import FontFaceObserver from 'fontfaceobserver'
import { trigger } from 'redial'

import configureStore from './store'
import getRoutes from './routes'

const fontObserver = new FontFaceObserver('Vollkorn', {})

fontObserver.check().then(() => {
  document.body.classList.add('js-fonts-loaded')
  document.body.classList.add('animate-in')
  document.body.classList.remove('no-webfonts')
  setTimeout(() => { document.body.classList.remove('animate-in') }, 500)
}, () => {
  document.body.classList.remove('js-fonts-loaded')
})

const store = configureStore(window.__data)
const { dispatch } = store
const routes = getRoutes()

browserHistory.listen((location) => {
  match({ routes, location }, (e, redirectLocation, renderProps) => {
    const { components } = renderProps

    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch
    }

    trigger('defer', components, locals)
  })
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
