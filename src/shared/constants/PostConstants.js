'use strict';

import Flux from 'flummox';

Flux.createConstants({

  name: 'PostConstants',

  serviceActionTypes: [
    'POST_GET_POSTS',
    'POST_GET_POST_BY_SLUG',
  ],

});
