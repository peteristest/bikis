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
  <div className={className} style={{lineHeight: '1.5em', fontSize: '2em', marginTop: 0, textAlign: 'left'}}>
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

const Tab = () => <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>

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

    const titleAwards = 'Awards'
    const textAwards = titleAwards.split('').map((character, i) => (
      character + Array(titleAwards.length - i + (i ? 0 : 1)).fill('&nbsp;').join('') + '<br />'
    )).join('')

    return (
      <div className='home height-100'>
        <SvgFilters />
        <div className='bio relative z2 height-100 px2 py1' style={{maxWidth: '1400px'}}>
          <Bio
            renderToggle={this.renderToggle.bind(this)} className={bioClassName} />
          <div className='clearfix mx-auto relative'>
            <p className='left pl3'>
              <span className='medium-text distort left-align mb2 inline-block absolute top-0 pt1'>
                Featured work
              </span><br />
              <span className='inline-block h4 font-alternative pl2' style={{lineHeight: '1.5em'}}>
                {work.map((project, i) => (
                  <span>{Array(i + 1).fill(<Tab />)}<a href='#'>{project}</a><br /></span>
                ))}
              </span>
            </p>
            <p className='right mr3 ml3 pr3 relative pl4'>
              <span
                className='medium-text distort right-align block absolute left-0'
                style={{lineHeight: '0.55em'}}
                dangerouslySetInnerHTML={{ __html: textAwards }} />
              <br />
              <span className='h4 font-alternative inline-block' style={{lineHeight: '1.5em'}}>
                {awards.map((award, i) => (
                  <span>{Array(i + 1).fill(<Tab />)}{award}<br /></span>
                ))}
              </span>
            </p>
          </div>
          <p className='clearfix center mt3'>
            <span
              className='caps medium-text distort center inline-block'
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
