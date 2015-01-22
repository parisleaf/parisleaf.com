'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import PostHandler from './components/PostHandler';
import PortfolioHandler from './components/PortfolioHandler';
import ProjectHandler from './components/ProjectHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="work" path="/work" handler={PortfolioHandler} />
    <Route name="project" path="/work/:slug" handler={ProjectHandler} />
    <Route name="projectByClient" path="/work/:client/:slug" handler={ProjectHandler} />
    <Route name="post" path="/blog/:slug" handler={PostHandler} />
    <DefaultRoute name="home" handler={HomeHandler} />
    <NotFoundRoute name="404" handler={HomeHandler} />
  </Route>
);

export default Routes;
