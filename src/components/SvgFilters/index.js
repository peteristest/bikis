import React from 'react'

export const FILTER_NOISE = 'noise'
export const FILTER_TURBULENCE = 'turbulence'

const SvgFilters = ({baseFrequency, filterResult, colorFrom, colorTo}) => (
  <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='svg-filters' style={{position: 'absolute'}}>
    <defs>
      <linearGradient id='gradient'>
        <stop offset='5%' stopColor={colorFrom} />
        <stop offset='80%' stopColor={colorTo} />
      </linearGradient>
      {[2, 3, 2, 3, 1].map((scale, i) => (
        <filter id={`fuzzy-0${i + 1}`} key={i}>
          <feTurbulence id='turbulence' baseFrequency={baseFrequency} numOctaves='3' result={filterResult} seed={i} />
          <feDisplacementMap in='SourceGraphic' in2='noise' scale={scale} />
        </filter>
      ))}
    </defs>
  </svg>
)

SvgFilters.propTypes = {
  baseFrequency: React.PropTypes.string,
  filterResult: React.PropTypes.oneOf([FILTER_NOISE, FILTER_TURBULENCE]),
  colorFrom: React.PropTypes.string,
  colorTo: React.PropTypes.string
}

SvgFilters.defaultProps = {
  colorFrom: '#06f200',
  colorTo: '#cdc9ff',
  baseFrequency: '0.05 0.05',
  filterResult: FILTER_NOISE
}

export default SvgFilters
