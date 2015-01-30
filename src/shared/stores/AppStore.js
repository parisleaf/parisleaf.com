'use strict';

import Flux from 'flummox';
let AppConstants = Flux.getConstants('AppConstants');
import Immutable from 'immutable';

import { color } from '../theme';

Flux.createStore({
  name: 'AppStore',

  initialize() {
    this.state = {
      nav: {
        open: false,
        textColor: color('text'),
      },
      isTransitioning: false,
    };

    this.options = Immutable.Map();
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

    [AppConstants.APP_ROUTE_TRANSITION_BEGIN, function() {
      this.state.isTransitioning = true;
      this.emit('change');
    }],

    [AppConstants.APP_ROUTE_TRANSITION_END, function() {
      this.state.isTransitioning = false;
      this.emit('change');
    }],
    
    [AppConstants.APP_GET_OPTIONS_SUCCESS, function(options) {
      let self = this;
      options.map(function(option) {
        let key = Object.keys(option)[0];
        let value = option[key][0];
        self.options = self.options.set(key, Immutable.fromJS(value));
      });
      this.emit('change');
    }],
  ],

  getState() {
    return this.state;
  },

  getOptions() {
    return this.options;
  }

});
