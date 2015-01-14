'use strict';

import Flux from 'flummox';
let AppConstants = Flux.getConstants('AppConstants');

Flux.createStore({
  name: 'AppStore',

  initialize() {
    this.state = {
      nav: {
        open: false,
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
  ],

  getState() {
    return this.state;
  },

});
