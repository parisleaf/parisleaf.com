'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import PostHandler from './components/PostHandler';
import PageHandler from './components/PageHandler';
import PortfolioHandler from './components/PortfolioHandler';
import BlogHandler from './components/BlogHandler';
import ProjectHandler from './components/ProjectHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route path="/work" name="work" handler={PortfolioHandler} />
    <Route path="/work/:slug" name="project" handler={ProjectHandler} />
    <Route path="/work/*/:slug" handler={ProjectHandler} />
    <Route path="/blog/:slug" name="post" handler={PostHandler} />
    <Route path="/blog/*/:slug" handler={PostHandler} />
    <Route path="/blog" name="blog" handler={BlogHandler} />
    <Route path="/:slug" name="page" handler={PageHandler} />
    <DefaultRoute name="home" handler={HomeHandler} />
    <NotFoundRoute name="404" handler={HomeHandler} />
  </Route>
);

export default Routes;
