'use strict';

import Flux from 'flummox';

let AppConstants = Flux.getConstants('AppConstants');

Flux.createActions({

  name: 'AppActions',

  openNav() {
    this.dispatchAction(AppConstants.APP_NAV_OPEN);
  },

  closeNav() {
    this.dispatchAction(AppConstants.APP_NAV_CLOSE);
  },

});
