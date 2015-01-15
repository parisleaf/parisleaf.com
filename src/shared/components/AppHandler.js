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

import '../constants/MenuConstants';
import '../actions/MenuActions';
import '../stores/MenuStore';

let AppStore = Flux.getStore('AppStore');
let AppActions = Flux.getActions('AppActions');

let MenuStore = Flux.getStore('MenuStore');
let MenuActions = Flux.getActions('MenuActions');

import AppNav from './AppNav';

let App = React.createClass({

  statics: {
    prepareForRun(state) {
      // Make sure nav is dismissed on re-route
      AppActions.closeNav();

      return MenuActions.getMenuBySlug('primary');
    }
  },

  getInitialState() {
    return Object.assign({
      primaryMenu: MenuStore.getMenuBySlug('primary'),
    }, AppStore.getState());
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
    });
  },

  render() {
    let appNav;

    appNav = <AppNav primaryMenu={this.state.primaryMenu} open={this.state.nav.open} />;

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
