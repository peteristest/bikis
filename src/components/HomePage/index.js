/*
 * HomePage
 */

import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group'
import { browserHistory } from 'react-router'
import classNames from 'classnames'
import SimpleMarkdown from 'simple-markdown'
import R from 'ramda'
import { slantedText, verticalText } from './../../utils/format'

import './styles.css'

import WorldMap from './../WorldMap'
import CyclingNotes from './../../containers/CyclingNotes/'
import WindowWithCursor from './../WindowWithCursor'
import Bio from './../Bio'

const Tab = () => <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

const SvgFilters = () => {
  const baseFrequency = '0.05 0.05'
  const filterResult = 'noise'

  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='svg-filters' style={{position: 'absolute'}}>
      <defs>
        <linearGradient id='gradient'>
          <stop offset='5%' stopColor='rgb(132, 73, 249)' />
          <stop offset='95%' stopColor='#FF6' />
        </linearGradient>
        <filter id='filter'>
          <feTurbulence type='turbulence' baseFrequency='0.00001 0.018001' numOctaves='1' result='warp'></feTurbulence>
          <feDisplacementMap scale='30' in='SourceGraphic' in2='warp' />
        </filter>
        {[2, 3, 2, 3, 1].map((scale, i) => (
          <filter id={`fuzzy-0${i + 1}`} key={i}>
            <feTurbulence id='turbulence' baseFrequency={baseFrequency} numOctaves='3' result={filterResult} seed={i}/>
            <feDisplacementMap in='SourceGraphic' in2='noise' scale={scale} />
          </filter>
        ))}
      </defs>
    </svg>
  )
}

const parseMd = R.compose(
  SimpleMarkdown.defaultOutput,
  SimpleMarkdown.defaultBlockParse
)

class HomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      offset: 0,
      dragging: false
    }
  }

  handleToggle (hover, url) {
    // Update history
    browserHistory.push(hover ? url : '')
  }

  handleOffset (offset) {
    this.setState({
      dragging: true,
      offset
    })
  }

  resetState (prop, e, ui) {
    this.setState({
      dragging: false,
      offset: 0
    })

    browserHistory.push('/')
  }

  render () {
    const { color, work, awards, bio, contact, footer, activeComponent, routeMap, travelMap } = this.props
    const { dragging } = this.state

    const mapType = routeMap ? 'route' : 'cities'
    const mapVisible = Boolean(travelMap || routeMap)

    const bioClassName = classNames('max-width', {
      'faded': Boolean(activeComponent) || dragging,
      'disabled': dragging
    })
    const mapClassName = classNames('component map fixed abs-center z1', {
      'fuzzy': mapVisible
    })
    const offset = this.state.offset * 0.2

    // Safari is dishonest about supporting SVG filters
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    const className = classNames('home height-11', {'no-svgfilters': isSafari})

    return (
      <div className={className}>
        {!isSafari && <SvgFilters />}
        <div className='relative z2 height-100 px2 py1' style={{maxWidth: '1400px'}}>
          <Bio
            content={bio}
            activeToggle={`/${activeComponent}`}
            dragging={dragging}
            handleOffset={this.handleOffset.bind(this)}
            handleToggle={this.handleToggle.bind(this)}
            handleRelease={this.resetState.bind(this)}
            className={bioClassName} />
          <div className='clearfix mx-auto relative flex flex-wrap'>
            <p className='pl3'>
              <span className='medium-text text-work distort left-align mb2 inline-block absolute top-0 pt1'>
                Featured work
              </span><br />
              <span className='inline-block h4 font-alternative pl2' style={{lineHeight: '1.5em'}}>
                {work.map((project, i) => (
                  <span key={i}>{Array(i + 1).fill(<Tab />)}<a href='#'>{project}</a><br /></span>
                ))}
              </span>
            </p>
            <div className='ml-auto'>
              <p className='mr3 ml3 pr3 relative pl4'>
                <span
                  className='medium-text text-awards distort right-align block absolute left-0'
                  style={{lineHeight: '0.55em'}}
                  dangerouslySetInnerHTML={{ __html: slantedText('Awards') }} />
                <br />
                <span className='h4 font-alternative inline-block' style={{lineHeight: '1.5em'}}>
                  {awards.map((award, i) => (
                    <span key={i}>{Array(i + 1).fill(<Tab />)}{award}<br /></span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          <div className='clearfix center mt3'>
            <span
              className='caps medium-text text-sayhello distort center inline-block'
              style={{lineHeight: '0.75em'}}
              dangerouslySetInnerHTML={{ __html: verticalText('Say Hello') }}
            /><br />
            <div
              className='mt3 font-alternative inline-block'
              style={{lineHeight: '1.5em'}}>
              {parseMd(contact)}
            </div>
          </div>
          <div
            className='small font-monospace pb3 mt4 max-width-2 mx-auto center'
            dangerouslySetInnerHTML={{ __html: footer }} />
        </div>
        <WorldMap
          visible={mapVisible}
          color={color}
          type={mapType}
          offset={offset}
          className={mapClassName} />
        <ReactCSSTransitionGroup
          transitionName='visualisation'
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}>
          {this.props.children}
        </ReactCSSTransitionGroup>
        <ReactTransitionGroup>
          {routeMap && <WindowWithCursor><CyclingNotes /></WindowWithCursor>}
        </ReactTransitionGroup>
      </div>
    )
  }
}

HomePage.propTypes = {
  color: PropTypes.string.isRequired,
  work: PropTypes.arrayOf(PropTypes.string).isRequired,
  awards: PropTypes.arrayOf(PropTypes.string).isRequired,
  bio: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  footer: PropTypes.string.isRequired,
  activeComponent: PropTypes.string,
  routeMap: PropTypes.bool,
  travelMap: PropTypes.bool
}

export default HomePage
