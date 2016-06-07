import fetch from 'isomorphic-fetch'

import { FETCH_INSTAGRAM_PHOTOS, FETCH_CYCLING_DATA } from './../constants/AppConstants'
import { IG_ACCESS_TOKEN, STRAVA_ACCESS_TOKEN } from './../config'

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
