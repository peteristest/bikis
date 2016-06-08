import fetch from 'isomorphic-fetch'
import { FETCH_INSTAGRAM_PHOTOS, FETCH_CYCLING_DATA, FETCH_SITE_CONTENT } from './../constants/AppConstants'

function fetchInstagramPhotos (data) {
  return {
    type: FETCH_INSTAGRAM_PHOTOS,
    data
  }
}

export const asyncFetchInstagramPhotos = () => (dispatch, getState) => {
  const url = '/api/photos'

  if (shouldFetchInstagramPhotos(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((images) => dispatch(fetchInstagramPhotos(images)))
  }
}

export const shouldFetchInstagramPhotos = ({ photos }) => Boolean(!photos.images.length)

function fetchCyclingData (data) {
  return {
    type: FETCH_CYCLING_DATA,
    data
  }
}

export const asyncFetchCyclingData = () => (dispatch, getState) => {
  const url = '/api/cycling'

  if (shouldFetchCyclingData(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(fetchCyclingData(data)))
  }
}

export const shouldFetchCyclingData = ({ photos }) => Boolean(!photos.images.length)

function fetchSiteContent (data) {
  return {
    type: FETCH_SITE_CONTENT,
    data
  }
}

export const asyncFetchSiteContent = () => (dispatch, getState) => {
  const url = '/api/content'

  if (shouldFetchSiteContent(getState())) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => dispatch(fetchSiteContent(data)))
  }
}

export const shouldFetchSiteContent = ({ home }) => Boolean(!home.bio.length)
