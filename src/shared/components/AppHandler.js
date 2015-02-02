'use strict';

import React from 'react';
import { RouteHandler, Link, State } from 'react-router';

import Flux from 'flummox';

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

      AppActions.setNavTextColor(color('text'));

      // Make sure nav is dismissed on re-route
      AppActions.setNavOpen(false);
    }
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let AppStore = this.context.flux.getStore('app');
    let MenuStore = this.context.flux.getStore('menus');
    let TweetStore = this.context.flux.getStore('tweets');


    return Object.assign({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
      secondaryMenu: MenuStore.getMenuBySlug('secondary'),
      tweets: TweetStore.getTweets(),
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
    let MenuStore = this.context.flux.getStore('menus');

    AppStore.addListener('change', this.appStoreDidChange);
    MenuStore.addListener('change', this.menuStoreDidChange);
  },

  componentWillUnmount() {
    let AppStore = this.context.flux.getStore('app');
    let MenuStore = this.context.flux.getStore('menus');

    AppStore.removeListener('change', this.appStoreDidChange);
    MenuStore.removeListener('change', this.menuStoreDidChange);
  },

  appStoreDidChange() {
    let AppStore = this.context.flux.getStore('app');

    this.setState(AppStore.getState());
  },

  menuStoreDidChange() {
    let MenuStore = this.context.flux.getStore('menus');

    this.setState({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
      secondaryMenu: MenuStore.getMenuBySlug('secondary'),
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
