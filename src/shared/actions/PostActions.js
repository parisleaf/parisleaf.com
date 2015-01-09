'use strict';

import Flux from 'flummox';

let PostConstants = Flux.getConstants();

Flux.createActions({

  name: 'PostActions',

  serviceActions: {
    getPosts: [PostConstants.POST_GET_POST, function(query = {}) {
      
    }],
  },

});
