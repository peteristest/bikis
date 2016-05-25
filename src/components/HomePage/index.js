/*
 * HomePage
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import VennDiagram from './../VennDiagram'
import WorldMap from './../WorldMap'
import CyclingNotes from './../../containers/CyclingNotes/'
import WindowWithCursor from './../WindowWithCursor'
import PhotosContainer from './../../containers/PhotosContainer/'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ReactTransitionGroup from 'react-addons-transition-group'
import classNames from 'classnames'
import Draggable from 'react-draggable'

const Bio = ({renderToggle, className = ''}) => (
  <div className={className} style={{lineHeight: '1.5em', fontSize: '2em', marginTop: 0, textAlign: 'left', maxWidth: '1400px'}}>
    <p className='mt0' >
      <span>Creative Technologist, Designer and Engineer.</span> <a href='//asketicsf.com' target='_blank'>Asketic</a> <span>Co-founder.</span>
      <span className='large-text distort block center right'>Peteris<br /><span style={{marginLeft: '-0.5em'}}>Bikis</span> </span>
      <span>&nbsp; I am a</span> {renderToggle('venn diagram', 'venn')} <span>of design,</span> {renderToggle('technology', 'technology')}<span>, </span>{renderToggle('the Internet', 'cloud')}<span>,</span>
      &nbsp;{renderToggle('travel', 'travelMap')}<span>, </span>{renderToggle('cycling', 'routeMap')}<span>, and</span> {renderToggle('photography', 'photos')}<span>.</span>
      <span> Currently obsessed with React and functional
      programming. Interested in</span> {renderToggle('AI', 'ai')}<span>, neural networks
      and a</span> {renderToggle('weirder', 'weird')} <span>future</span>.
    </p>
  </div>
)

const Gif = ({src, name}) => (
  <span className={`component ${name} ai fixed top-0 right-0`}><img src={src} /><span className='bg absolute top-0 left-0 right-0 bottom-0' /></span>
)

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
      venn: false,
      photos: false,
      travelMap: false,
      routeMap: false,
      ai: false,
      weird: false,
      cloud: false,
      offset: 0
    }
  }

  renderToggle (label, prop) {
    const toggle = (hover) => {
      if (this.state.dragging) { return }

      this.setState({
        hover: hover ? prop : false,
        [prop]: hover
      })
    }

    const setOffset = (e, ui) => {
      this.setState({
        dragging: prop,
        offset: this.state.offset + (ui.x - ui.lastX)
      })
    }

    const resetState = (e, ui) => {
      this.setState({
        dragging: false,
        hover: false,
        offset: 0,
        [prop]: false
      })
    }

    const position = this.state.offset ? null : {x: 0, y: 0}
    const className = classNames('toggle inline-block', {'toggle-hover': this.state.hover === prop})

    return (
      <Draggable onDrag={setOffset.bind(this)} onStop={resetState.bind(this)} position={position}>
        <span className='inline-block toggle-container'>
          <span className='inline-block'>
            <span className={className}
              onMouseOver={toggle.bind(this, true)}
              onMouseOut={toggle.bind(this, false)}>{label}</span>
          </span>
        </span>
      </Draggable>
    )
  }

  render () {
    const { data: { disciplines, color, work, awards } } = this.props

    const sizeLarge = 9
    const sizeSmall = 3
    const { clientWidth, clientHeight } = window.document.documentElement
    const w = clientWidth * 0.8 * 0.8
    const h = clientHeight * 0.7 * 0.8

    const { venn, photos, travelMap, routeMap, ai, weird, cloud, technology, hover, dragging } = this.state
    const mapType = routeMap ? 'route' : 'cities'
    const mapVisible = Boolean(travelMap || routeMap)

    const bioClassName = classNames('max-width', {'faded': hover || dragging}, {'disabled': dragging})
    const offset = this.state.offset * 0.2

    return (
      <div className='home height-100'>
        <SvgFilters />
        <div className='bio relative z2 height-100 px2 py1'>
          <Bio
            renderToggle={this.renderToggle.bind(this)} className={bioClassName} />
          <div className='clearfix'>
            <p className='left'>
              <span className='medium-text distort center'>Featured Work</span><br />
              <span className='inline-block h4 font-alternative' style={{lineHeight: '1.5em'}}>
                {work.map((project) => (
                  <span><a href='#'>{project}</a><br /></span>
                ))}
              </span>
            </p>
            <p className='right mr2'>
              <span className='medium-text distort center'>Awards</span><br />
              <span className='h4 font-alternative inline-block' style={{lineHeight: '1.5em'}}>
                {awards.map((award) => (
                  <span>{award}<br /></span>
                ))}
              </span>
            </p>
          </div>
          <p className='flex flex-center flex-stretch clearfix'>
            <a href='//twitter.com/peteris'>@peteris</a>
            <span className='medium-text distort flex-auto center'>Say Hello</span>
            <a href='mailto:hi@peter.is'>hi@peter.is</a>
          </p>
          <p className='small font-monospace pb3 mt4 max-width-2 mx-auto'>
            &copy; Peteris Bikis 2016. Built using React, Redux, Basscss and D3. <br />Illustrations used with permission by <a href='http://vincemckelvie.tumblr.com/'>Vince McKelvie</a>.
          </p>
        </div>
        <ReactCSSTransitionGroup
          transitionName='visualisation'
          transitionEnterTimeout={600}
          transitionLeaveTimeout={600}>
        {venn && (
          <VennDiagram
            key='venn'
            intersectLabel={['']}
            items={disciplines}
            large={sizeLarge}
            small={sizeSmall}
            duration={1000}
            width={w}
            height={h}
            animate
            className='component venn fixed absolute-center z1' />
        )}
        {photos && (
          <PhotosContainer
            className='component photos fixed top-0 left-0 m2 z1'
            style={{width: '50%'}}
          />
        )}
          <WorldMap
            visible={mapVisible}
            color={color}
            type={mapType}
            offset={offset}
            className='component map fixed abs-center z1' />
          {technology && <Gif name='technology' src='https://media.giphy.com/media/jy7Ipmx7Zeb0k/giphy.gif' />}
          {cloud && <Gif name='cloud' src='https://media.giphy.com/media/OT2lwSsUgpsT6/giphy.gif' />}
          {ai && (<Gif name='ai' src='https://media.giphy.com/media/IWoZqzqk7LZn2/giphy.gif' />)}
          {weird && (<Gif name='weird' src='https://media.giphy.com/media/QTKpNChuRixKo/giphy.gif' />)}
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
