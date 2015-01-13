'use strict';

import React from 'react';
import { RouteHandler, Link } from 'react-router';

import Flux from 'flummox';

import '../constants/PostConstants';
import '../actions/PostActions';
import '../stores/PostStore';

import '../constants/MenuConstants';
import '../actions/MenuActions';
import '../stores/MenuStore';

let MenuStore = Flux.getStore('MenuStore');
let MenuActions = Flux.getActions('MenuActions');

import AppNav from './AppNav';

let App = React.createClass({

  statics: {
    prepareForRun(state) {
      return MenuActions.getMenuBySlug('primary');
    }
  },

  getInitialState() {
    return {
      primaryMenu: MenuStore.getMenuBySlug('primary'),
    };
  },

  componentDidMount() {
    MenuStore.addListener('change', this.menuStoreDidChange);
  },

  componentWillUnmount() {
    MenuStore.removeListener('change', this.menuStoreDidChange);
  },

  menuStoreDidChange() {
    this.setState({
      menu: MenuStore.getMenuBySlug('primary'),
    });
  },

  render() {
    let appNav;

    if (this.state.primaryMenu) {
      appNav = <AppNav primaryMenu={this.state.primaryMenu} />;
    }

    return (
      <div className="App">
        {appNav}
        <RouteHandler />
      </div>
    );
  }
});

export default App;
