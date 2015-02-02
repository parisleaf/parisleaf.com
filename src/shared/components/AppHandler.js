'use strict';

import React from 'react';
import { RouteHandler, Link } from 'react-router';

import Flux from 'flummox';

import '../constants/ProjectConstants';
import '../actions/ProjectActions';
import '../stores/ProjectStore';

import '../constants/MenuConstants';
import '../actions/MenuActions';
import '../stores/MenuStore';

import '../constants/TwitterConstants';
import '../actions/TwitterActions';
import '../stores/TwitterStore';

let MenuStore = Flux.getStore('MenuStore');
let MenuActions = Flux.getActions('MenuActions');

let TwitterStore = Flux.getStore('TwitterStore');
let TwitterActions = Flux.getActions('TwitterActions');

import AppNav from './AppNav';
import AppOverlay from './AppOverlay';

import MediaMixin from 'react-media-mixin';
import { color } from '../theme';

let App = React.createClass({

  mixins: [MediaMixin],

  statics: {
    routerWillRun(state) {
      let AppActions = state.flux.getActions('app');

      AppActions.setNavTextColor(color('text'));

      // Make sure nav is dismissed on re-route
      AppActions.setNavOpen(false);

      return Promise.all([
        MenuActions.getMenus(),
        TwitterActions.getTweets(),
        AppActions.getOptions(),
      ]);
    }
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let AppStore = this.context.flux.getStore('app');

    return Object.assign({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
      secondaryMenu: MenuStore.getMenuBySlug('secondary'),
      tweets: TwitterStore.getTweets(),
    }, AppStore.state);
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
    let AppStore = this.context.flux.getStore('app');

    AppStore.addListener('change', this.appStoreDidChange);
    MenuStore.addListener('change', this.menuStoreDidChange);
  },

  componentWillUnmount() {
    let AppStore = this.context.flux.getStore('app');

    AppStore.removeListener('change', this.appStoreDidChange);
    MenuStore.removeListener('change', this.menuStoreDidChange);
  },

  appStoreDidChange() {
    let AppStore = this.context.flux.getStore('app');

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
        open={this.state.navOpen}
        textColor={this.state.navTextColor}
        options={this.state.options}
      />;

    return (
      <div className="App">
        {appNav}
        <AppOverlay active={this.state.isTransitioning} />
        <div>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

export default App;
