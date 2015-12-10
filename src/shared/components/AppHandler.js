'use strict';

import React from 'react';
import { RouteHandler, State } from 'react-router';
import ga from 'react-google-analytics';
import Helmet from 'react-helmet';

import FluxComponent from 'flummox/component';

import AppNav from './AppNav';
import AppOverlay from './AppOverlay';
import PageFooter from './PageFooter';
import Preloader from './Preloader';
import SvgIcon from './SvgIcon';

import MediaMixin from 'react-media-mixin';
import { color } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let GAInitiailizer = ga.Initializer;
const GA_TRACKING_CODE = 'UA-18415954-1';

let App = React.createClass({

  mixins: [State, MediaMixin],

  statics: {
    willTransitionTo(transition) {
      const { path } = transition;

      if (path !== '/' && path.endsWith('/')) {
        transition.redirect(path.substring(0, path.length - 1));
      }
    },

    routerWillRun({ state, flux }) {
      let AppActions = flux.getActions('app');
      let MenuActions = flux.getActions('menus');
      let TweetActions = flux.getActions('tweets');

      return Promise.all([
        MenuActions.getMenus(),
        TweetActions.getTweets(),
        AppActions.getOptions(),
      ]);
    },

    routerDidRun({ state, flux }) {
      const NavActions = flux.getActions('nav');

      // Make sure nav is dismissed on re-route
      NavActions.setOpen(false);
      NavActions.setColor({ text: color('text'), background: '#fff' });

      // Send google analytics page view on initial route and re-route
      ga('send', 'pageview', state.path);
    }
  },

  childContextTypes: {
    media: React.PropTypes.object,
  },

  getChildContext() {
    return {
      media: this.state.media || {},
    }
  },

  getInitialState() {
    return {
      showPreloader: true
    }
  },

  componentDidMount() {
    this.setState({ showPreloader: false });
    ga('create', GA_TRACKING_CODE);
  },

  render() {
    let appNav =
      <FluxComponent connectToStores={{
        nav: store => ({
          open: store.state.open,
          textColor: store.state.color.get('text'),
          backgroundColor: store.state.color.get('background'),
        }),
        app: store => ({
          options: store.state.options,
        })
      }}>
        <AppNav />
      </FluxComponent>

    return (
      <div className="App">
        <Helmet
          title="Parisleaf, A Florida Branding & Digital Agency"
          meta={[
            {"name": "description", "content": "We work with higher education and tech in Gainesville, Orlando, Tampa, Atlanta, & Seattle on branding, websites, copywriting, design, photography, & video."},
            {"name": "keywords", "content": "branding, agency, florida, branding agency, florida branding agency, website design, website development, web design, web development"},
            {"property": "og:description", "content": "We work with higher education and tech in Gainesville, Orlando, Tampa, Atlanta, & Seattle on branding, websites, copywriting, design, photography, & video."},
            {"property": "og:image", "content": "https://parisleaf.com/img/admin-logo.png"},
            {"property": "og:site_name", "content": "Parisleaf, A Florida Branding & Digital Agency"},
            {"property": "og:title", "content": "Parisleaf, A Florida Branding & Digital Agency"},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com"},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]}
          link={[
            {"rel": "canonical", "href": "https://www.parisleaf.com"},
          ]} />
        <Preloader showPreloader={this.state.showPreloader} />
        {appNav}
        <AppOverlay />
        <RouteHandler />
        <GAInitiailizer />
        <PageFooter />
      </div>
    );
  }
});

export default App;
