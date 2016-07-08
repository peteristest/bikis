import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { FETCH_INSTAGRAM_PHOTOS, FETCH_CYCLING_DATA, FETCH_SITE_CONTENT, GOTO_URL } from './../constants/AppConstants'
import config from './../config'
import { isServerSide } from './../utils/env'

function fetchInstagramPhotos (data) {
  return {
    type: FETCH_INSTAGRAM_PHOTOS,
    data
  }
}

export const apiURL = (url) => isServerSide() ? (config.apiHost + url) : url

export const asyncFetchInstagramPhotos = () => (dispatch, getState) => {
  const url = apiURL('/api/photos')

  if (shouldFetchInstagramPhotos(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((images) => dispatch(fetchInstagramPhotos(images)))
  }
}

const shouldFetchInstagramPhotos = ({ photos }) => Boolean(!photos.images.length)

function fetchCyclingData (data) {
  return {
    type: FETCH_CYCLING_DATA,
    data
  }
}

export const asyncFetchCyclingData = () => (dispatch, getState) => {
  const url = apiURL('/api/cycling')

  if (shouldFetchCyclingData(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(fetchCyclingData(data)))
  }
}

const shouldFetchCyclingData = ({ cycling }) => Boolean(!cycling.distance)

function fetchSiteContent (data) {
  return {
    type: FETCH_SITE_CONTENT,
    data
  }
}

export const asyncFetchSiteContent = () => (dispatch, getState) => {
  const url = apiURL('/api/content')

  if (shouldFetchSiteContent(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(fetchSiteContent(data)))
  }
}

const shouldFetchSiteContent = ({ home }) => Boolean(!home.bio.length)

export function setUrl (url, replace) {
  if (replace) {
    browserHistory.replace(url)
  } else {
    browserHistory.push(url)
  }

  return {
    type: GOTO_URL,
    url
  }
}
