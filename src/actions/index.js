import fetch from 'isomorphic-fetch'
import { FETCH_INSTAGRAM_PHOTOS, FETCH_CYCLING_DATA, FETCH_SITE_CONTENT } from './../constants/AppConstants'
import config from './../config'

function fetchInstagramPhotos (data) {
  return {
    type: FETCH_INSTAGRAM_PHOTOS,
    data
  }
}

const apiURL = (url) => config.apiHost + url

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
