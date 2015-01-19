'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import PostHandler from './components/PostHandler';
import PortfolioHandler from './components/PortfolioHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <DefaultRoute name="home" handler={HomeHandler} />
    <Route name="work" path="/work" handler={PortfolioHandler} />
    <Route name="post" path="/blog/:slug" handler={PostHandler} />
  </Route>
);

export default Routes;
