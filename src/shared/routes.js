import React from 'react';
import { Route, DefaultRoute, NotFoundRoute, Redirect } from 'react-router';
import AppHandler from './components/AppHandler';
import HomeHandler from './components/HomeHandler';
import AboutHandler from './components/AboutHandler';
import TeamHandler from './components/TeamHandler';
import PostHandler from './components/PostHandler';
import PageHandler from './components/PageHandler';
import PortfolioHandler from './components/PortfolioHandler';
import BlogHandler from './components/BlogHandler';
import ContactHandler from './components/ContactHandler';
import ProjectHandler from './components/ProjectHandler';
import NotFoundHandler from './components/NotFoundHandler';

const Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route path="/work" name="work" handler={PortfolioHandler} />
    <Route path="/work/:slug" name="project" handler={ProjectHandler} />
    <Route path="/work/*/:slug" handler={ProjectHandler} />
    <Route path="/about" name="about" handler={AboutHandler} />
    <Route path="/team" name="team" handler={TeamHandler} />
    <Route path="/contact" name="contact" handler={ContactHandler} />
    <Route path="/blog/*/:slug" handler={PostHandler} />
    <Route path="/blog/:slug" name="post" handler={PostHandler} />
    <Route path="/blog" name="blog" handler={BlogHandler} />

    <Redirect from="/gainesville-branding" to="home" />
    <Redirect from="/gainesville-creative-services" to="home" />
    <Redirect from="/gainesville-graphic-design" to="home" />
    <Redirect from="/gainesville-motion-graphics" to="home" />
    <Redirect from="/gainesville-photography" to="home" />
    <Redirect from="/gainesville-printing" to="home" />
    <Redirect from="/gainesville-videograph" to="home" />
    <Redirect from="/gainesville-web-design" to="home" />
    <Redirect from="/gainesville-creative-services" to="home" />

    <Redirect from="/about-parisleaf" to="about" />
    <Redirect from="/careers" to="blog" query={{ cateogry: 'careers' }} />

    <Route path="/:slug" name="page" handler={PageHandler} />
    <DefaultRoute name="home" handler={HomeHandler} />
    <NotFoundRoute name="404" handler={NotFoundHandler} />
  </Route>
);

export default Routes;
