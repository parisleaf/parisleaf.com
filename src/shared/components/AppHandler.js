'use strict';

import React from 'react';
import { RouteHandler, State } from 'react-router';
import DocumentTitle from 'react-document-title';

import FluxComponent from 'flummox/component';

import AppNav from './AppNav';
import AppOverlay from './AppOverlay';
import PageFooter from './PageFooter';

import MediaMixin from 'react-media-mixin';
import { color } from '../theme';

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
        <DocumentTitle title="Parisleaf" />
        {appNav}
        <AppOverlay />
        <div>
          <RouteHandler />
        </div>
        <PageFooter />
      </div>
    );
  }
});

export default App;
