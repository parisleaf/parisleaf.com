'use strict';

import React from 'react';
import HomeFirstImpression from './HomeFirstImpression'

import Flux from 'flummox';

let AppActions = Flux.getActions('AppActions');

let PageStore = Flux.getStore('PageStore');
let PageActions = Flux.getActions('PageActions');

import { color } from '../theme';

let Home = React.createClass({

  statics: {
    prepareForRun() {
      AppActions.setNavTextColor(color('yellow'));

      return PageActions.getPageBySlug('home');
    },
  },

  getInitialState() {
    return {
      page: PageStore.getPageBySlug('home'),
    };
  },

  componentDidMount() {
    PageStore.addListener('change', this.pageStoreDidChange);
  },

  componentWillUnmount() {
    PageStore.removeListener('change', this.pageStoreDidChange);
  },

  pageStoreDidChange() {
    this.setState(PageStore.getPageBySlug('home'));
  },

  render() {
    return (
      <div>
        <HomeFirstImpression page={this.state.page} />
      </div>
    );
  }

});

export default Home;
