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
import { Router, Route, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import FontFaceObserver from 'fontfaceobserver'

const fontObserver = new FontFaceObserver('Vollkorn', {})

fontObserver.check().then(() => {
  document.body.classList.add('js-fonts-loaded')
}, () => {
  document.body.classList.remove('js-fonts-loaded')
})

import rootReducer from './reducers/index'
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(rootReducer)

import HomePage from './components/HomePage'
import App from './components/App'
import { TechnologyGif, WeirdGif, AiGif, CloudGif } from './components/Gif'
import PhotosContainer from './containers/PhotosContainer'
import VennDiagramContainer from './containers/VennDiagramContainer'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path='/' component={HomePage}>
          <Route path='/technology' component={TechnologyGif} />
          <Route path='/weirder' component={WeirdGif} />
          <Route path='/ai' component={AiGif} />
          <Route path='/internet' component={CloudGif} />
          <Route path='/photography' component={PhotosContainer} />
          <Route path='/venn' component={VennDiagramContainer} />
        </Route>
        <Route path='*' component={HomePage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
