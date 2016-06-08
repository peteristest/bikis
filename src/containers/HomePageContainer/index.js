/*
 * HomePageContainer
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { asyncFetchSiteContent } from '../../actions'
import HomePage from './../../components/HomePage'

class HomePageContainer extends Component {

  componentWillMount () {
    const { asyncFetchSiteContent } = this.props
    asyncFetchSiteContent()
  }

  render () {
    const { bio, footer, color, work, awards, contact } = this.props.data
    const activeComponent = this.props.location.pathname.replace(/^\//, '')

    const routeMap = (activeComponent === 'cycling')
    const travelMap = (activeComponent === 'travel')

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
  { asyncFetchSiteContent }
)(HomePageContainer)
