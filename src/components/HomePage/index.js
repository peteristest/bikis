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
import Helmet from 'react-helmet'

import { slantedText, verticalText } from './../../utils/format'

import './styles.css'

import WorldMap from './../WorldMap'
import CyclingNotes from './../../containers/CyclingNotes/'
import WindowWithCursor from './../WindowWithCursor'
import Bio from './../Bio'
import DistortedText from './../DistortedText'

const Tab = () => <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

const SvgFilters = () => {
  const baseFrequency = '0.05 0.05'
  const filterResult = 'noise'

  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='svg-filters' style={{position: 'absolute'}}>
      <defs>
        <linearGradient id='gradient'>
          <stop offset='5%' stopColor='#06f200' />
          <stop offset='80%' stopColor='#cdc9ff' />
        </linearGradient>
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

    this.handleOffset = this.handleOffset.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.resetState = this.resetState.bind(this)
  }

  handleToggle (hover, url) {
    // todo: clean up
    // Update history
    if (!hover && this.props.activeComponent && this.currentToggle !== url && !this.isTouchDevice) {
      // Ignore late mouse leave update
    } else {
      browserHistory.replace(hover ? url : '')
    }

    if (hover) {
      this.currentToggle = url
    }
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

  componentDidMount () {
    this.isTouchDevice = 'ontouchstart' in document.documentElement
  }

  render () {
    const { color, work, awards, bio, contact, footer, activeComponent, routeMap, travelMap } = this.props
    const { dragging } = this.state

    const mapType = routeMap ? 'route' : 'cities'
    const mapVisible = Boolean(travelMap || routeMap)

    const bioClassName = classNames('max-width mb3 bio', {
      'faded': Boolean(activeComponent) || dragging,
      'disabled': dragging
    })
    const mapClassName = classNames('component map fixed abs-center z1', {
      'fuzzy': mapVisible
    })
    const offset = this.state.offset * 0.2

    return (
      <div>
        <Helmet title='Peteris Bikis – Designer and Engineer' />
        <SvgFilters />
        <div className='relative z2 height-100 px2 py1' style={{maxWidth: '1400px'}}>
          <Bio
            content={bio}
            activeToggle={`/${activeComponent}`}
            dragging={dragging}
            handleOffset={this.handleOffset}
            handleToggle={this.handleToggle}
            handleRelease={this.resetState}
            className={bioClassName}>
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
          </Bio>
          <div className='clearfix mx-auto relative flex flex-wrap mb3 mt3'>
            <div className='mx-auto sm-mx0 sm-pl3 mt2 mb3' style={{minWidth: '45%'}}>
              <DistortedText
                id='work'
                url={activeComponent}
                className='medium-text text-work left-align mb2 inline-block absolute top-0 pt1'
                content='Featured work' />
              <span className='inline-block h4 font-alternative sm-pl2 lh3 mt3'>
                {work.map((project, i) => (
                  <span key={i}>{Array(i + 1).fill(<Tab />)}<a target='_blank' href={project.split('|')[1]}>{project.split('|')[0]}</a><br /></span>
                ))}
              </span>
            </div>
            <div className='mx-auto sm-ml-auto mb3'>
              <p className='sm-ml3 sm-pr3 relative pl4'>
                <DistortedText
                  id='awards'
                  url={activeComponent}
                  className='medium-text text-awards right-align block absolute left-0 lh1'
                  turbulence={0.0015}
                  content={slantedText('Awards')} />
                <span className='h4 font-alternative inline-block lh3 mt3'>
                  {awards.map((award, i) => (
                    <span key={i}>{Array(i + 1).fill(<Tab />)}{award}<br /></span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          <div className='clearfix center'>
            <DistortedText
              id='contact'
              url={activeComponent}
              className='caps medium-text text-sayhello center inline-block lh2'
              turbulence={0.001}
              content={verticalText('Say Hello')} />
            <br />
            <div className='mt3 font-alternative inline-block lh3 h4'>
              {parseMd(contact)}
            </div>
          </div>
          <div
            className='small font-monospace pb3 mt4 max-width-2 mx-auto center px1 border-box'
            style={{maxWidth: '42em'}}
            dangerouslySetInnerHTML={{ __html: footer }} />
        </div>
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
