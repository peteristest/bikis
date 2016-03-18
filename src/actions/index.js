import fetchJsonp from 'fetch-jsonp'

import { FETCH_INSTAGRAM_PHOTOS } from '../constants/AppConstants'
import { IG_ACCESS_TOKEN } from '../config'

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
