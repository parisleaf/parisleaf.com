'use strict';

import Flux from 'flummox';

import APIService from '../services/APIService';
let AppConstants = Flux.getConstants('AppConstants');

Flux.createActions({

  name: 'AppActions',

  openNav() {
    this.dispatchAction(AppConstants.APP_NAV_OPEN);
  },

  closeNav() {
    this.dispatchAction(AppConstants.APP_NAV_CLOSE);
  },

  setNavTextColor(color) {
    this.dispatchAction(AppConstants.APP_NAV_SET_TEXT_COLOR, color);
  },

  routeTransitionBegin(state) {
    this.dispatchAction(AppConstants.APP_ROUTE_TRANSITION_BEGIN, state);
  },

  routeTransitionEnd(state) {
    this.dispatchAction(AppConstants.APP_ROUTE_TRANSITION_END, state);
  },

  serviceActions: {
    getOptions: [AppConstants.APP_GET_OPTIONS, function(...args) {
      return APIService.getOptions(...args);
    }],
  }
});
