import fetch from 'isomorphic-fetch'

export function fetchInstagramPhotos (req, res, next) {
  const { IG_ACCESS_TOKEN } = process.env
  const api = 'https://api.instagram.com/v1/users/self/media/recent'
  const url = `${api}?access_token=${IG_ACCESS_TOKEN}`

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const images = json.data.map((item) => (
        item.images.standard_resolution.url
      ))

      return res.json(images)
    })
}

export function fetchStravaData (req, res, next) {
  const api = 'https://www.strava.com/api/v3/athlete/activities'
  const { STRAVA_ACCESS_TOKEN } = process.env
  const url = `${api}?access_token=${STRAVA_ACCESS_TOKEN}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => res.json({
      name: data[0].name,
      distance: (data[0].distance * 0.001).toFixed(2),
      date: data[0].start_date
    }))
}
