'use strict';

import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import PostHandler from './components/PostHandler';
import PageHandler from './components/PageHandler';
import PortfolioHandler from './components/PortfolioHandler';
import BlogHandler from './components/BlogHandler';
import ContactHandler from './components/ContactHandler';
import ProjectHandler from './components/ProjectHandler';
import NotFoundHandler from './components/NotFoundHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route path="/blog/*/:slug" handler={PostHandler} />
    <Route path="/blog/:slug" name="post" handler={PostHandler} />
    <NotFoundRoute name="404" handler={NotFoundHandler} />
  </Route>
);

export default Routes;

// <Route path="/work" name="work" handler={PortfolioHandler} />
// <Route path="/work/:slug" name="project" handler={ProjectHandler} />
// <Route path="/work/*/:slug" handler={ProjectHandler} />
// <Route path="/contact" name="contact" handler={ContactHandler} />
// <Route path="/blog" name="blog" handler={BlogHandler} />
// <Route path="/:slug" name="page" handler={PageHandler} />
// <DefaultRoute name="home" handler={HomeHandler} />
