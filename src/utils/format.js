import R from 'ramda'

const fillWithSpaces = R.compose(
  R.join(''),
  (length) => Array(length).fill('&nbsp;')
)

const fillWithTabs = (arr) => arr.map((character, i) => (
  character + fillWithSpaces(arr.length - i + (i ? 0 : 1)) + '<br />'
))

export const slantedText = R.pipe(
  R.split(''),
  fillWithTabs,
  R.join('')
)

export const verticalText = R.pipe(
  R.split(''),
  R.join('<br />')
)
