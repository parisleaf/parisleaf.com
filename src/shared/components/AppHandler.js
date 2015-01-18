'use strict';

import React from 'react';
import { RouteHandler, Link } from 'react-router';

import Flux from 'flummox';

import '../constants/AppConstants';
import '../actions/AppActions';
import '../stores/AppStore';

import '../constants/PostConstants';
import '../actions/PostActions';
import '../stores/PostStore';

import '../constants/PageConstants';
import '../actions/PageActions';
import '../stores/PageStore';

import '../constants/ProjectConstants';
import '../actions/ProjectActions';
import '../stores/ProjectStore';

import '../constants/MenuConstants';
import '../actions/MenuActions';
import '../stores/MenuStore';

import '../constants/TwitterConstants';
import '../actions/TwitterActions';
import '../stores/TwitterStore';

let AppStore = Flux.getStore('AppStore');
let AppActions = Flux.getActions('AppActions');

let MenuStore = Flux.getStore('MenuStore');
let MenuActions = Flux.getActions('MenuActions');

let TwitterStore = Flux.getStore('TwitterStore');
let TwitterActions = Flux.getActions('TwitterActions');

import AppNav from './AppNav';

import MediaMixin from 'react-media-mixin';
import { color } from '../theme';

let App = React.createClass({

  mixins: [MediaMixin],

  statics: {
    prepareForRun(state) {
      AppActions.setNavTextColor(color('text'));

      // Make sure nav is dismissed on re-route
      AppActions.closeNav();

      return Promise.all([
        MenuActions.getMenus(),
        TwitterActions.getTweets(),
      ]);
    }
  },

  getInitialState() {
    return Object.assign({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
      secondaryMenu: MenuStore.getMenuBySlug('secondary'),
      tweets: TwitterStore.getTweets()
    }, AppStore.getState());
  },

  childContextTypes: {
    media: React.PropTypes.object,
  },

  getChildContext() {
    return {
      media: this.state.media || {},
    }
  },

  componentDidMount() {
    AppStore.addListener('change', this.appStoreDidChange);
    MenuStore.addListener('change', this.menuStoreDidChange);
  },

  componentWillUnmount() {
    AppStore.removeListener('change', this.appStoreDidChange);
    MenuStore.removeListener('change', this.menuStoreDidChange);
  },

  appStoreDidChange() {
    this.setState(AppStore.getState());
  },

  menuStoreDidChange() {
    this.setState({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
      secondaryMenu: MenuStore.getMenuBySlug('secondary'),
      tweets: TwitterStore.getTweets()
    });
  },

  render() {
    let appNav =
      <AppNav
        primaryMenu={this.state.primaryMenu}
        secondaryMenu={this.state.secondaryMenu}
        tweets={this.state.tweets}
        {...this.state.nav}
      />;

    return (
      <div className="App">
        {appNav}
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

export default App;
