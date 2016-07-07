/*
 * HomePageContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchSiteContent, setUrl } from '../../actions'
import HomePage from './../../components/HomePage'

const COMPONENT_CYCLING = 'cycling'
const COMPONENT_TRAVEL = 'travel'

class HomePageContainer extends Component {

  componentWillMount () {
    const { asyncFetchSiteContent } = this.props
    asyncFetchSiteContent()
  }

  render () {
    const { bio, footer, color, work, awards, contact } = this.props.data
    const { location, setUrl } = this.props
    const activeComponent = location.pathname.replace(/^\//, '')

    const routeMap = (activeComponent === COMPONENT_CYCLING)
    const travelMap = (activeComponent === COMPONENT_TRAVEL)

    return (
      <HomePage
        bio={bio}
        contact={contact}
        footer={footer}
        color={color}
        work={work}
        awards={awards}
        activeComponent={activeComponent}
        routeMap={routeMap}
        setUrl={setUrl}
        travelMap={travelMap}>
        {this.props.children}
      </HomePage>
    )
  }
}

function mapStateToProps ({ home }) {
  return {
    data: home
  }
}

export default connect(
  mapStateToProps,
  { asyncFetchSiteContent, setUrl }
)(HomePageContainer)
