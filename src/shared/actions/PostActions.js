'use strict';

import Flux from 'flummox';
import WPService from '../services/WPService';

let PostConstants = Flux.getConstants();

Flux.createActions({

  name: 'PostActions',

  serviceActions: {
    getPosts: [PostConstants.POST_GET_POSTS, function() {
      return WPService.getPosts(filter)
        .then(response => response.json());
    }],

    getPostBySlug: [PostConstants.POST_GET_POST_BY_SLUG, function(...args) {
      return WPService.getPostBySlug(...args)
        .then(response => response.json());
    }],
  },

});
