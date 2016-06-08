import React from 'react'
import { Route } from 'react-router'

import HomePageContainer from './../containers/HomePageContainer'
import App from './../components/App'
import { TechnologyGif, WeirdGif, AiGif, CloudGif } from './../components/Gif'
import PhotosContainer from './../containers/PhotosContainer'
import VennDiagramContainer from './../containers/VennDiagramContainer'

export default () => (
  <Route component={App}>
    <Route path='/' component={HomePageContainer}>
      <Route path='/technology' component={TechnologyGif} />
      <Route path='/weirder' component={WeirdGif} />
      <Route path='/ai' component={AiGif} />
      <Route path='/internet' component={CloudGif} />
      <Route path='/photography' component={PhotosContainer} />
      <Route path='/venn' component={VennDiagramContainer} />
    </Route>
    <Route path='/*' component={HomePageContainer} />
  </Route>
)
