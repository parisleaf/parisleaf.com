'use strict';

import React from 'react';
import { RouteHandler, State } from 'react-router';
import DocumentTitle from 'react-document-title';

import FluxComponent from 'flummox/component';

import AppNav from './AppNav';
import AppOverlay from './AppOverlay';

import MediaMixin from 'react-media-mixin';
import { color } from '../theme';

let App = React.createClass({

  mixins: [State, MediaMixin],

  statics: {
    routerWillRun(state) {
      let AppActions = state.flux.getActions('app');
      let MenuActions = state.flux.getActions('menus');
      let TweetActions = state.flux.getActions('tweets');

      return Promise.all([
        MenuActions.getMenus(),
        TweetActions.getTweets(),
        AppActions.getOptions(),
      ]);
    },

    routerDidRun(state) {
      let AppActions = state.flux.getActions('app');

      // Make sure nav is dismissed on re-route
      AppActions.setNavOpen(false);
      AppActions.setNavTextColor(color('text'));
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
        app: store => ({
          open: store.state.navOpen,
          textColor: store.state.navTextColor,
          options: store.state.options,
        })
      }}>
        <AppNav />
      </FluxComponent>

    return (
      <DocumentTitle title="Parisleaf">
        <div className="App">
          {appNav}
          <AppOverlay />
          <div>
            <RouteHandler />
          </div>
        </div>
      </DocumentTitle>
    );
  }
});

export default App;
