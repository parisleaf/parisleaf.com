'use strict';

import Flux from 'flummox';
let AppConstants = Flux.getConstants('AppConstants');

import { color } from '../theme';

Flux.createStore({
  name: 'AppStore',

  initialize() {
    this.state = {
      nav: {
        open: false,
        textColor: color('text'),
      },
    };
  },

  actions: [
    [AppConstants.APP_NAV_CLOSE, function() {
      this.state.nav.open = false;
      this.emit('change');
    }],

    [AppConstants.APP_NAV_OPEN, function() {
      this.state.nav.open = true;
      this.emit('change');
    }],

    [AppConstants.APP_NAV_SET_TEXT_COLOR, function(color) {
      this.state.nav.textColor = color;
      this.emit('change');
    }],
  ],

  getState() {
    return this.state;
  },

});
