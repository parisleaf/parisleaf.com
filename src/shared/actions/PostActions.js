'use strict';

import Flux from 'flummox';
import WPService from '../services/WPService';

let PostConstants = Flux.getConstants('PostConstants');

Flux.createActions({

  name: 'PostActions',

  serviceActions: {
    getPosts: [PostConstants.POST_GET_POSTS, function(...args) {
      return WPService.getPosts(...args);
    }],

    getPostBySlug: [PostConstants.POST_GET_POST_BY_SLUG, function(...args) {
      return WPService.getPostBySlug(...args);
    }],
  },

});
