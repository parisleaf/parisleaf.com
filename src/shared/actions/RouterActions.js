'use strict';

import Flux from 'flummox';

let RouterConstants = Flux.getConstants('RouterConstants');

Flux.createActions({

  name: 'RouterActions',

  routerWillRun(state) {
    this.dispatchAction(RouterConstants.ROUTER_WILL_RUN, state);
  }

});
