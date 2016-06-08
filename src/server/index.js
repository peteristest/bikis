'use strict'

import Express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import favicon from 'serve-favicon'
import compression from 'compression'
import path from 'path'
import PrettyError from 'pretty-error'
import http from 'http'
import { trigger } from 'redial'
import { match, RouterContext } from 'react-router'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'

import config from './../config'
import configureStore from './../store'
import getRoutes from './../routes'
import Html from './../helpers/Html'
import { fetchInstagramPhotos, fetchStravaData } from './api.js'

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

app.use(compression())
app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')))
app.use('/static', Express.static(path.join(__dirname, '..', '..', 'static')))
app.use('/dist', Express.static(path.join(__dirname, '..', '..', 'dist')))

// Dead simple API functionality
app.get('/api/photos', fetchInstagramPhotos)
app.get('/api/cycling', fetchStravaData)

const handleRequest = (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const history = createHistory(req.originalUrl)
  const store = configureStore()
  const assets = webpackIsomorphicTools.assets()

  function hydrateOnClient (assets) {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>))
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient(assets)
    return
  }

  match({ history, routes: getRoutes(), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient()
    } else if (renderProps) {
      // Get array of route handler components:
      const { components } = renderProps

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch: store.dispatch
      }

      trigger('fetch', components, locals)
        .then(() => {
          const component = (
            <Provider store={store} key='provider'>
              <RouterContext {...renderProps} />
            </Provider>
          )

          res.status(200)

          global.navigator = {userAgent: req.headers['user-agent']}

          res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>))
        })
        .catch((err) => {
          console.log(pretty.render(err))
          res.status(500)
          hydrateOnClient()
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}

// Routing
app.use((req, res) => {
  handleRequest(req, res)
})

server.listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.error(err)
  }
  console.info('----\n==> ✅  %s is running', config.app)
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port)
})
