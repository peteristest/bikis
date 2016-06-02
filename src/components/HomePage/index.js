/*
 * HomePage
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import './styles.css'

import WorldMap from './../WorldMap'
import CyclingNotes from './../../containers/CyclingNotes/'
import WindowWithCursor from './../WindowWithCursor'
import Toggle from './../Toggle'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group'
import classNames from 'classnames'

const Bio = ({className = '', handleRelease, handleToggle, handleOffset, activeToggle, dragging}) => {
  const toggle = (label, id) => {
    id = id || label
    const disabled = Boolean(dragging && activeToggle && id !== activeToggle)
    const active = id === activeToggle

    return (
      <Toggle
        label={label}
        id={id}
        active={active}
        disabled={disabled}
        handleToggle={handleToggle}
        handleRelease={handleRelease}
        handleOffset={handleOffset} />
    )
  }

  return (
    <div className={className} style={{lineHeight: '1.5em', fontSize: '2em', marginTop: 0, textAlign: 'left'}}>
      <p className='mt0' >
        <span>Creative Technologist, Designer and Engineer.</span> <a href='//asketicsf.com' target='_blank'>Asketic</a> <span>Co-founder.</span>
        <span className='large-text text-pb distort block center right'>Peteris<br /><span style={{marginLeft: '-0.5em'}}>Bikis</span> </span>
        <span>&nbsp; I am a</span> {toggle('venn diagram', 'venn')} <span>of design,</span> {toggle('technology')}<span>, </span>{toggle('the Internet', 'internet')}<span>,</span>
        &nbsp;{toggle('travel', 'travelMap')}<span>, </span> {toggle('cycling', 'routeMap')}<span>, and</span> {toggle('photography')}<span>.</span>
        <span> Currently obsessed with React and functional
        programming. Interested in</span> {toggle('AI')}<span>, neural networks
        and a</span> {toggle('weirder')} <span>future.</span>
      </p>
    </div>
  )
}

const Tab = () => <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

const SvgFilters = () => {
  const baseFrequency = '0.05 0.05'
  const filterResult = 'noise'

  return (
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' class='svg-filters' style={{position: 'absolute'}}>
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

class HomePage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      offset: 0,
      dragging: false
    }
  }

  handleToggle (hover, prop) {
    // Update history
    browserHistory.push(hover ? `/${prop}` : '')
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
    const { data: { color, work, awards }, routeParams: { splat }, location: { pathname } } = this.props

    const { dragging } = this.state

    const hover = pathname.replace(/^\//, '')
    const routeMap = (splat === 'routeMap')
    const travelMap = (splat === 'travelMap')
    const mapType = routeMap ? 'route' : 'cities'
    const mapVisible = Boolean(travelMap || routeMap)

    const bioClassName = classNames('max-width', {'faded': hover || dragging}, {'disabled': dragging})
    const mapClassName = classNames('component map fixed abs-center z1', {'fuzzy': mapVisible})
    const offset = this.state.offset * 0.2

    const titleAwards = 'Awards'
    const textAwards = titleAwards.split('').map((character, i) => (
      character + Array(titleAwards.length - i + (i ? 0 : 1)).fill('&nbsp;').join('') + '<br />'
    )).join('')

    // Safari is dishonest about supporting SVG filters
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    const className = classNames('home height-11', {'no-svgfilters': isSafari})

    return (
      <div className={className}>
        {!isSafari && <SvgFilters />}
        <div className='bio relative z2 height-100 px2 py1' style={{maxWidth: '1400px'}}>
          <Bio
            activeToggle={hover}
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
                  dangerouslySetInnerHTML={{ __html: textAwards }} />
                <br />
                <span className='h4 font-alternative inline-block' style={{lineHeight: '1.5em'}}>
                  {awards.map((award, i) => (
                    <span key={i}>{Array(i + 1).fill(<Tab />)}{award}<br /></span>
                  ))}
                </span>
              </p>
            </div>
          </div>
          <p className='clearfix center mt3'>
            <span
              className='caps medium-text text-sayhello distort center inline-block'
              style={{lineHeight: '0.75em'}}
              dangerouslySetInnerHTML={{ __html: 'Say Hello'.split('').join('<br />') }}
            /><br />
            <span className='mt3 font-alternative inline-block' style={{lineHeight: '1.5em'}}>
              <a href='mailto:hi@peter.is'>hi@peter.is</a><br />
              <a href='//twitter.com/peteris'>@peteris</a><br />
              +44 (0)7 534 72 9985<br />
            </span>
          </p>
          <p className='small font-monospace pb3 mt4 max-width-2 mx-auto center'>
            &copy; Peteris Bikis 2016. Built using React, Redux, Basscss and D3. <br />Illustrations used with permission by <a href='http://vincemckelvie.tumblr.com/'>Vince McKelvie</a>.
          </p>
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

function mapStateToProps (state) {
  return {
    data: state.home
  }
}

export default connect(
  mapStateToProps
)(HomePage)
