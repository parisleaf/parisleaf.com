'use strict';

import Flux from 'flummox';
let RouterConstants = Flux.getConstants('RouterConstants');

Flux.createStore({
  name: 'RouterStore',

  initialize() {
    this.state = null;
  },

  actions: [
    [RouterConstants.ROUTER_WILL_RUN, function(state) {
      this.state = state;
      this.emit('routerWillRun');
      this.emit('change');
    }],
  ],

  getState() {
    return this.state;
  },

  getQuery() {
    return this.state.query;
  }

});
