'use strict';

import Flux from 'flummox';

Flux.createConstants({

  name: 'AppConstants',

  actionTypes: [
    'APP_NAV_OPEN',
    'APP_NAV_CLOSE',
    'APP_NAV_SET_TEXT_COLOR',
    'APP_ROUTE_TRANSITION_BEGIN',
    'APP_ROUTE_TRANSITION_END',
  ],

  serviceActionTypes: [
    'APP_GET_OPTIONS',
  ],
});
