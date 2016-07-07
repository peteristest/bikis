export const isTouchDevice = () => (
  typeof window !== 'undefined' && 'ontouchstart' in document.documentElement
)

export const isSmallScreen = () => (
  document.documentElement.clientWidth < 700
)

export const supportsMixBlendMode = () => (
  'CSS' in window && 'supports' in window.CSS && window.CSS.supports('mix-blend-mode', 'screen')
)

export const isSafari = () => (
  /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
)

export const isIE = () => (
  /Edge|Trident|MSIE/.test(navigator.userAgent)
)
