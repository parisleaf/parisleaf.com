'use strict';

import React from 'react';
import { RouteHandler } from 'react-router';

import Flux from 'flummox';

import '../constants/PostConstants';
import '../actions/PostActions';
import '../stores/PostStore';

import '../constants/MenuConstants';
import '../actions/MenuActions';
import '../stores/MenuStore';

let MenuStore = Flux.getStore('MenuStore');
let MenuActions = Flux.getActions('MenuActions');

const menuSlug = 'primary';

let App = React.createClass({

  statics: {
    prepareForRun(state) {
      return MenuActions.getMenuBySlug(menuSlug);
    }
  },

  getInitialState() {
    return {
      menu: MenuStore.getMenuBySlug(menuSlug),
    };
  },

  componentDidMount() {
    MenuStore.addEventListener('change', this.menuStoreDidChange);
  },

  componentWillUnmount() {
    MenuStore.removeEventListener('change', this.menuStoreDidChange);
  },

  menuStoreDidChange() {
    this.setState({
      menu: MenuStore.getMenuBySlug(menuSlug),
    });
  },

  render() {
    let links = this.state.menu.get('items')
      .map(item => <a href={item.get('url')}>{item.get('title')}</a>)
      .toJS();

    return (
      <div className="App">
        <nav>{links}</nav>
        <RouteHandler />
      </div>
    );
  }
});

export default App;
