/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!../serviceworker.js'
import 'file?name=[name].[ext]!../manifest.json'
import 'file?name=[name].[ext]!../.htaccess'

// Check for ServiceWorker support before trying to install it
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then(() => {
    // Registration was successful
  }).catch(() => {
    // Registration failed
  })
} else {
  // No ServiceWorker Support
}

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FontFaceObserver from 'fontfaceobserver'
import createHistory from 'history/lib/createBrowserHistory'

const karlaObserver = new FontFaceObserver('Karla', {})

// When Karla is loaded, add the js-karla-loaded class to the body
karlaObserver.check().then(() => {
  document.body.classList.add('js-karla-loaded')
}, () => {
  document.body.classList.remove('js-karla-loaded')
})

// Import the pages
import HomePage from './components/HomePage'
import NotFoundPage from './components/NotFound'
import App from './components/App'

// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder
import '../css/main.css'

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
import rootReducer from './reducers/index'
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
ReactDOM.render(
  <Provider store={store}>
    <Router history={createHistory()}>
      <Route component={App}>
        <Route path='/' component={HomePage} />
        <Route path='*' component={NotFoundPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
