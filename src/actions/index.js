import fetchJsonp from 'fetch-jsonp'

import { FETCH_INSTAGRAM_PHOTOS, FETCH_CYCLING_DATA } from './../constants/AppConstants'
import { IG_ACCESS_TOKEN, STRAVA_ACCESS_TOKEN } from './../config'

function fetchInstagramPhotos (data) {
  return {
    type: FETCH_INSTAGRAM_PHOTOS,
    data
  }
}

export const asyncFetchInstagramPhotos = () => (dispatch, getState) => {
  const url = 'https://api.instagram.com/v1/users/self/media/recent'

  if (shouldFetchInstagramPhotos(getState())) {
    return fetchJsonp(`${url}?access_token=${IG_ACCESS_TOKEN}`)
      .then((response) => response.json())
      .then((images) => dispatch(fetchInstagramPhotos(images.data)))
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
  const url = 'https://www.strava.com/api/v3/athlete/activities'

  if (shouldFetchCyclingData(getState())) {
    return fetchJsonp(`${url}?access_token=${STRAVA_ACCESS_TOKEN}`)
      .then((response) => response.json())
      .then((data) => dispatch(fetchCyclingData(data)))
  }
}

export const shouldFetchCyclingData = ({ photos }) => Boolean(!photos.images.length)
